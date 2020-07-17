## Model 工具类

`Model`工具类在`dva model`的基础上，封装更多实用的功能.

从 carno@2.2.5 开始，对`Model`工具类进行了优化，主要是以下4点：
- 通过 new Model 的方式来创建 model 实例
- 新增实例方法 extend
- 通过实例方法 extend 来扩展 dva model
- Model.extend 方法暂时保留

使用示例：

首先添加 model 的配置文件
```javascript
// ./src/configs/model.js
export default new Model({
  state: {
    search: { pn: 1, ps: PAGE_SIZE },
  },
  reducers: {},
  effects: {},
});
```
然后在业务中引入全局的 model
```javascript
import model from 'configs/model';

model.extend({
  state: {
    list: [],
  },
  ...
});
```

## Model

作用是初始化工具类，添加 model 的统一配置
参数是一个 Object。可以有 state、effects 和 reducers 这3个属性。另外允许在 state 中配置：search 和 loading

```javascript
new Model({
  state: {
    search: {},
    loading: {},
  },
  reducers: {},
  effects: {},
})
```
⚠️注意：
- 不要在 state 里面配置复杂数据（对象和数组），search 和 loading 除外，其他的数据可能会造成多个 model.state 数据混淆
- reducers 和 effects 中的默认值不会被覆盖，避免自己添加的方法不会生效，即自定义的方法不要和默认方法重名

## model.extend

作用是扩展统一的`model`配置
参数是一个 Object。可以有 state、subscriptions、effects 和 reducers 这4个属性

下面分别详细说明下`extend`函数对`model`中`state`、`subscriptions`、`effects`和`reducers`的扩展

### state

state 的默认值如下：
```javascript
{
  detail: {}, // 详情
  list: [], // 列表
  total: 0, // 列表总数
  search: { pn: 1, ps: 10 }, // 搜索条件
  loading: { list: false, confirm: false, submit: false, spin: false }, // 4种 loading
}
```
可以看到，state 中默认添加了常用的业务数据

### subsciptions

为方便对`path`的监听，在`model`的 subscriptions 配置函数参数中，额外添加了扩展方法`listen`    
`listen`函数参数如下：
- pathReg 需要监听的 pathName，它支持被 [pathToRegexp](https://github.com/pillarjs/path-to-regexp) 解析
- action
  action 既可以是 redux action，也可以是一个回调函数
  如果`action`是函数，调用时，将传入`{ ...location, query, params, paramsObj }`作为其参数
  **query** 为普通对象，用法：const { sid } = query
  **params** 为类数组，支持的用法有：const [id] = params 或 const { id } = params
  **paramsObj** 为普通对象，和 params 的数据一样，只是数据结构不同，所以用法只有：const { id } = paramsObj

- enhance 默认为 true，在执行 action 之前，默认对 model 进行一些**预处理**，如果设置为 false，则禁用预处理

listen 函数也支持同时对多个 pathname 的监听，传入的参数需要为`{pathReg: action}`健值对的对象

listen 函数可以传入两个回调，分别表示进入 path 时和离开 path 时

默认情况下，在执行 action 之前，会先执行`beforeEnterListener`，代码如下：
```
dispatch({ type: 'resetState', payload: { force: true } }); // 强制清空 model 的数据
dispatch({ type: 'updateSearch', payload: search }); // 更新 search
dispatch({ type: 'updateState', payload: paramsObj }); // 将 params 注入到 state 中
```
然后才会执行 listen 的回调函数
如果有特殊需求，可以通过设置 enhance 为 false 将`beforeEnterListener`方法禁用

```javascript
import model from 'configs/model';
import { qs } from 'carno/third-party';

export default model.extend({
  namespace: 'user',

  subscriptions: {
    setupSubscriber({ dispatch, listen }) {
      // action 为 redux action
      listen('/user/list', { type: 'fetchUsers'});

      // action 为回调函数1
      listen('/user?sid=1', ({ query }) => dispatch({ type: 'fetchUser', payload: query }));

      // action 为回调函数2
      listen('/user/:userId/project/:proojectId', () => dispatch({ type: 'fetchUsers' }));

      // 支持对多个 path 的监听
      listen({
        '/user/list': ({ query, params }) => {},
        '/user/query': ({ query, params }) => {},
      });

      // 在之前的用法之上，传入第三个参数表示离开 path 的回调
      listen('/user/list', { type: 'fetchUsers'}, { type: 'clearUsers'});

      // 同上也支持对多个 path 的监听
      listen({
        '/user/list': [({ query, params }) => { console.log('enter'); }, ({ query, params }) => { console.log('leave'); }],
        '/user/query': [({ query, params }) => { console.log('enter'); }, ({ query, params }) => { console.log('leave'); }],
      });

      // 禁用 beforeEnterListener
      listen('/user/list', () => {
        dispatch({ type: 'resetState' });
        dispatch({ type: 'fetchUsers' });
      }, false);

      // 禁用 beforeEnterListener
      listen('/user/list', { type: 'fetchUsers'}, { type: 'clearUsers'}, false);
      
      // 禁用 beforeEnterListener
      listen({
        '/user/list': [({ query, params }) => { console.log('enter'); }, false],
        '/user/query': [({ query, params }) => { console.log('enter'); }, ({ query, params }) => { console.log('leave'); }, false],
      });
    },
  },
  effects: {
    * fetchUsers({ payload }, { select }) {
      const { userId, proojectId } = yield select('user');
      ...
    },
  },
})
```

### effects

`effects`扩展主要如下：

**put.sync**
同步put方法，参数与put一致，主要用于同步调用其他effect, ~~需使用`put.sync`接口，则需要在项目`src/index.js`文件中，使用`store`接口缓存dva app对象~~

```javascript
// model/user.js
model.extend({
  namespace: 'user',
  state: {},
  effects: {
    * fetchUsers({ payload }, { put, select, call }) {
      // 同步执行，保证先执行完fetchDepartments，再执行call
      const { departments } = yield put.sync({ type: 'department/fetchDepartments', payload: { userId: 1 } });
      const users = yeild call(services.user.getList);
      yield put({ type: 'updateUserDeparts', payload: { users, departments }})
    },
  },
});

// model/department.js
model.extend({
  namespace: 'department',
  state: {},
  effects: {
    * fetchDepartments({ payload: param }, { put, call }) {
      const departmentList = yeild call(services.user.fetchDepartments, param);
      yiele put({ type: 'updateState', payload: { departmentList } });
    },
  },
});
```

**update**
实际开发中，如果需要对第一级的`model`数据更改，又不想添加`reducer`, 则可以使用`update`直接更新数据(底层通过`updateState`来实现)，

```javascript

// model/user.js
Model.extend({
  namespace: 'user',
  state: {},
  effects: {
    * fetchUsers({ payload }, {call, update}) {
      const users = yeild call(services.user.getList);
      yield update({ users });
    },
  },
});
```

**call**

实际开发场景中，`call`一般应用在调用后台接口，往往需要处理加载状态以及业务消息，我们扩展`saga`原生的`call`方法，配合`withLoading`以及`withMessage`，以更方便的实现消息以及状态处理.

`withloadng`配置参数如下:
- service: http 请求
- key: 嵌套 key
- successMsg: 调用成功后的反馈信息
- errorMsg: 调用失败后的反馈信息
- withDone: 设置为 true 之后，对应的 loading 属性为 Boolean 对象，并且包含 done 属性(true－调用成功，false-调用失败), 如果传递给组件的 loading prop 则需要转化为 boolean 值(valueOf()), 如果要与 HModal 配置，则必须设置 withDone 为 true

```javascript
withLoading(service, key);
withLoading(service, key, '成功', '失败', true);
// 如果第二个参数传入的是对象，则对象包含service之后的参数配置
withLoading(service, { key: 'confirm', successMsg: '成功', errorMsg: '失败', withDone: true });
```

`withConfirmLoading`配置参数如下:

- service: http 请求
- successMsg: 调用成功后的反馈信息
- errorMsg: 调用失败后的反馈信息
- withDone: 设置为 true 之后，对应的 loading 属性为 Boolean 对象，并且包含 done 属性(true－调用成功，false-调用失败), 如果传递给组件的 loading prop 则需要转化为 boolean 值(valueOf()), 如果要与 HModal 配置，则必须设置 withDone 为 true

```javascript
withConfirmLoading(service, '保存成功', '保存失败', true);
// 这两种写法等价
withLoading(service, 'confirm', '保存成功', '保存失败', true);
```

`withSpinning`配置参数如下:

- service: http 请求
- successMsg: 调用成功后的反馈信息
- errorMsg: 调用失败后的反馈信息
- withDone: 设置为 true 之后，对应的 loading 属性为 Boolean 对象，并且包含 done 属性(true－调用成功，false-调用失败), 如果传递给组件的 loading prop 则需要转化为 boolean 值(valueOf()), 如果要与 HModal 配置，则必须设置 withDone 为 true

```javascript
withSpinning(service, '刷新成功', '刷新失败');
// 这两种写法等价
withLoading(service, 'spinning', '保存成功', '保存失败');
```

`withMessage`配置参数如下:

- successMsg
- errorMsg

```javascript
withMessage(service, '保存成功', '保存失败');
```

**localizeState**

部分`state`需要本地化地，并且能够在下一次使用的时候自动使用上一次记录的值，比如：记录用户习惯

**select**

`select`参数如下：
selector 和 allNSLocalState

selector: 有3种用法
```javascript
const { list } = yield select(({ user }) => user);
const { list } = yield select('user');
const [user, department] = yield select(['user', 'department']);
```

allNSLocalState：即表示要获取的本地化的state
```javascript
const { state, localState } = yield select((state, localState) => ({ state, localState }));
```

### reducer

主要提供如下默认的reducer方法:

- showLoading: 将对应 key 的 loading 属性设置为 true
- hideLoading: 将对应 key 的 loading 属性设置为 false
- updateSearch: 直接更新 search
- resetSearch: 重置 search
- updateState: 直接更新 state
- resetState: 重置 state
- clearLocalState: 清除本地化 state
- resetLocalState: 重置本地化 state

**showLoading/hideLoading**

`loading`相关的`reducer`支持嵌套数据，主要作用是配合`call`、`withLoading`.

```javascript
yield put({ type: 'showLoading', payload: { key: 'spin' } }) // 执行后model中的state为: { loading: { spin: true, ... }};
yield put({ type: 'hideLoading', payload: { key: 'spin' } }) // 执行后model中的state为: { loading: { spin: false, ... }};
```

**resetState**

用户登出以及某些页面切换的时候，需要更新model的数据，提供`resetState reducer`来方便处理这些操作.

用户通过面包屑跳转到父级路由时，往往希望保留父路由的`state`。配合`HLayout`组件一起使用时,`resetState`能自动检测是否由面包屑触发的路由跳转，如果是则会保留当前`model`的`state`数据（visible、loading数据除外）
如果您需要强制更新所有state数据，则可以传递force参数.

```javascript
dispatch({ type: 'resetState', payload: { force: true }});
```

**clearLocalState**

由于`state`是通过`localStorage`存储到本地的，所以提供`clearLocalState`用于清除本地存储state

```javascript
dispatch({ type: 'clearLocalState', payload: { force: true } });
```

**resetLocalState**

略微勉强，没有想好用户场景，算是与`resetState`对应吧

```javascript
dispatch({ type: 'resetLocalState', payload: { force: true } });
```

⚠️：以上本地化操作，只操作本地化`state`，要更新`state`需要用户手动调用`updateState`

综合示例如下:
```javascript
import { withLoading, withConfirmLoading, withSpinning } from 'carno/utils';
import model from 'configs/model';

model.extend({
  state: {
    loading: {
      list: false,
      confirm: false,
      spinning: false,
    },
  },
  effects: {
    * fetchUsers({ payload }, { put, select, call }) {
      // 介绍 withLoading 用法
      // 发送请求前，显示loading状态，完成后结束loading状态.如果请求成功则提示加载用户成功,失败则提示
      const getList = withLoading(service.user.getList, { key: 'list', successMsg: '加载用户成功', errorMsg: '加载用户失败' });
      // const getList = withLoading(service.user.getList, { key: 'list', successMsg:'加载用户成功',errorMsg:'加载用户失败', withDone: true });
      const users = yeild call(getList, { departId: 12 });

      // 对比 withConfirmLoading 用法
      const saveUser = withLoading(service.user.save, 'confirm', '添加用户成功');
      const saveUser = withConfirmLoading(service.user.save, '添加用户成功');

      // 对比 withSpinning 用法
      withLoading(service.user.getList, 'spinning', '刷新成功');
      withSpinning(service.user.getList, '刷新成功');

      // 介绍 withMessage 用法
      const getList = withMessage(service.user.getList, '加载用户成功', '加载用户失败');
      // 仅处理成功/失败的消息提示
      const users = yeild call(getList, userId, deptId);

      // 更新当前model的state
      yield update({ users })
      // update 方法等同于以下方法
      yield put({
        type: 'updateState',
        payload: {
          users
        }
      });

      // 同步put方法
      yield put.sync({ type: 'online/fetchList' });
      yield update({ sync: true }); // 此行代码会在 fetchList中代码快执行完毕后再执行

      // 将users本地化，并且下一次Model.state初始化的能给使用这个数据
      yield localize({ users });
      // 获取本地化的users
      const { state, localState } = yield select((state, localState) => ({ state, localState }));
    }
  }
})

```
