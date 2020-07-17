## Utils 通用函数

### 如何使用

```javascript
import { pick, toDateString, Type } from 'carno/utils`
```

### API

#### Array

**toObject** `toObject(arr, keyId = 'value', valueId = 'label')`

将数组转化为对象

```javascript
const arr = [{ value: 'a', label: '1' }, { value: 'b', label: '2' }];
const obj = toObject(arr);
=> { a: 1, b: 2 };
```

**merge** `merge(source, dest)`
合并数组

```javascript
const a = [1, 2, 3];
const b = [2, 4];
const c = merge(a, b)
=> [ 1, 2, 3, 4 ];
```

#### dva

**store** `store(dvaApp)`

存储dva对象，方便处理effect

```javascript
const app = store(dva({
  onError(e) {
    console.log(e);
  }
}));
```

**withLoading** `withLoading(service, key, successMsg, errorMsg, withDone)`

附加loading状态，需与call配合

```javascript
withLoading(getUser, 'loading', '成功', '失败', true);
withLoading(getUser, { key: 'loading', successMsg: '成功', errorMsg: '失败', withDone: true });

yield call(withLoading(services.userManage.getUsers, 'user'));
```

**withMessage** `withMessage(service, successMsg, errorMsg)`

附加消息，需与call配合

```javascript
withMessage(getUser, '成功', '失败');

yield call(withMessage(services.userManage.getUsers, '成功', '失败'));
```

**withConfirmLoading** `withConfirmLoading(service, successMsg, errorMsg, withDone)`

附加loading状态，需与call配合

```javascript
withConfirmLoading(getUser, '成功', '失败', true);

yield call(withConfirmLoading(services.userManage.getUsers, '成功', '失败', true));
```

**withSpinning** `withSpinning(service, successMsg, errorMsg, withDone)`

附加loading状态，需与call配合

```javascript
withSpinning(getUser, '成功', '失败', true);

yield call(withSpinning(services.userManage.getUsers, '成功', '失败', true));
```

#### Date

**toDateString** `toDateString(date)`
将时间转化为日期格式字符串

```javascript
const now = new Date();
const str = toDateString(now);
=> 2017-08-18
```

**toDateTimeString** `toDateTimeString(date)` 
将时间转化为日期时间格式字符串

```javascript
const now = new Date();
const str = toDateTimeString(now);
=> 2017-08-18 12:12:12
```

#### Object

**pick** `pick(obj, keys)`
返回一个object副本，只过滤出keys参数指定的属性值

```javascript
const obj = { a: 1, b: 2, c: 3};
const newObj = pick(obj, ['a', 'b']);
=> { a: 1, b: 2}
```

**extend** `extend(dest = {}, source = {})` 
对象继承,与assign类似，extend不会继承undefiend属性

```javascript
const dest = { a: 1, b: 2 };
const source = { c: undefined, d: 3 };
const obj = extend(dest, source);
=> { a: 1, b: 2, d: 3 }
```

**toArray** `toArray(obj, keyId, valueId)` 
将对象转化为数组

```javascript
const obj = { a: 1, b: 2 };
const arr = toArray(obj, 'id', 'value');
=> [{ id: 'a', value: 1 }, { id: 'b', value: 2 }]
```

#### Reducer

**createNestReducer** `createNestReducer (parentKey) => (state, { payload })`

创建可嵌套的reducer

```javascript
// reducer
{
  updateVisible: createNestReducer('visible')
}

yield put({ type: 'updateVisible', payload: { user: true }});
```

#### Route

**historyReplaceState** `historyReplaceState(url, searchParam, obj)`
跳转页面并替换上一个url
```javascript
historyReplaceState(`customer/workbench/detail/${id}`, { notResetState: true });
```

**createNestPage** `createNestPage(Comp)`
创建支持路由嵌套的页面

**redirect** `redirect('/user/:id', { id })`
跳转至指定的路由

**goBack** `goBack('/user/:id', { id })`
返回指定的路由, 调用此方法后，进入下一个路由会保留state(loading等状态例外), 如果没有穿入参数则返回前一个路由

```javascript

goBack() // 返回上一个route
goBack('/user/:id', { id }) // 返回用户详情

```

**getCurrentPath** `getCurrentPath()`
返回当前路由的path, 只支持hash方式

```javascript
// window.location http:localhost:8080/#/user/list?x=1
const path = getCurrentPath(window.location) // /user/list
```

**renderRoutes** `renderRoutes(routes: Array)`
使用routeConfig方式创建路由

```javascript
const routes = [
  {
    title: '订单管理',
    key: 'orderManage',
    path: '/orderManage',
    exact: true,
    component: pages.OrderManage,
  },
  {
    title: '账号管理',
    key: 'accountManage',
    children: [
      {
        title: '账户信息',
        key: 'accountDetail',
        path: '/accountDetail',
        exact: true,
        component: pages.AccountDetail,
      },
      {
        title: '用户管理',
        key: 'userManage',
        path: Paths.USER_MANAGE,
        exact: true,
        render: (props) => (<div>***</div>),
      },
    ]
  },
];

// HLayout或者其他需要添加路由的组件里
<Switch>
  {renderRoutes(routes)}
</Switch>
```

#### Other

**getDeployEnv** `getDeployEnv(delpoyEnv)` 
获取部署的环境, 如果调用时不传递参数，则获取缓存的环境数据

```javascript
import { getDeployEnv } from 'carno/utils';
import { servers } from 'configs';

export function getEnvServers() {
  return servers[getDeployEnv(process.env.DEPLOY_ENV)]
}

```

**wrapActions** `wrapActions(actions)`
包装actions对象

```javascript
function mapDispatchToProps(dispatch) {
  return wrapActions({
    onRefresh() {
      dispatch({ type: 'alarm/fetchAlarms' });
    },
  });
}
```

**model 注解** `@model(...namespace)`
将model 直接注入到入口组件 省略原Page connect操作

- model
 
```js
 ...
  namespace:'app',
   state:{
      loading: {
        list: true
      },
      list: []
   },
   effects: {
     * getList({payload}, ....){
        
     }
   },
   reducers:{
     update...
   }
 ...
```
- component

```js
import { model} from 'carno/utils';

@model('app')
export default class App extends React.Component {
  ...
   render(){

     //直接获取model 定义的state和 方法 
     // dispatch 默认注入到props 方便自定义需求
     const { loading, list, getList, update, dispatch} = this.props;
   }
  ...
}
```
**支持多model注入 为了使用方便 effects和reducers 直接注入到props上 所以多个model中定义effects/reducers/state不要重名**
```js
@model('app', 'loading', 'service')
export default class App extends React.Component {
  ...
   render(){
     const { loading, list, getList, update, dispatch} = this.props;
   }
  ...
}
```

#### Type

**Type.isString** `isString(source)`
判断是否为字符串

```javascript
Type.isString('123') // true
Type.isString(123) // false

```

**Type.isArray** `isArray(source)`
判断是否为数组

```javascript
Type.isArray([]) // true
Type.isArray({}) // false

```

**Type.isObject** `isObject(source)`
判断是否为纯对象

```javascript
Type.isObject({}) // true
Type.isObject(new Boolean()) // false

```

**Type.isFunction** `isFunction(source)`
判断是否为函数

```javascript
Type.isFunction(() => {}) // true
Type.isFunction({}) // false

```

**Type.isNumber** `isNumber(source)`
判断是否为数字

```javascript
Type.isNumber(123) // true
Type.isNumber("123") // false
Type.isNumber("xx") // false

```

**Type.isInt** `isInt(source)`
判断是否为整数

```javascript
Type.isInt(123) // true
Type.isInt(12.1) // false
Type.isInt("123") // false

```

**Type.isEmpty** `isEmpty(source)`
检查 source 是否为空。 判断的依据是除非是有枚举属性的对象，length 大于 0 的 arguments object, array, string 或类jquery选择器。
注意：**其他类型的数据都返回true**，使用之前先进行类型判断。

```javascript
Type.isEmpty('') // true
Type.isEmpty('abc') // false
Type.isEmpty({}) // true
Type.isEmpty({ a: 1 }) // false
Type.isEmpty([]) // true
Type.isEmpty([1, 2, 3]) // false

// 其他类型数据
Type.isEmpty(null) // true
Type.isEmpty(undefined) // true
Type.isEmpty(true) // true
Type.isEmpty(false) // true
Type.isEmpty(1) // true
Type.isEmpty(0) // true
```

**Type.isNill** `isNill(source)`
判断是否为 null 或 undefined

```javascript
Type.isNill(null) // true
Type.isNill(undefined) // true
Type.isNill([]) // false

```

#### Rule

封装了常见的rule，适用于ant-form validator

```javascript
import { Rule } from 'carno/utils';

<FormItem>
  {getFieldDecorator(getField(record), {
    initialValue: '',
    rules: [
      Rule.required("请输入用户名"),
      Rule.minLength(5, '请输入至少$1位字符'),
      Rule.maxLength(10, '请输入最多$1位字符'),
      Rule.validate((x => x !== 'f**k'), '请不要输入违禁字符')
    ]
  })(
    <Input />
  )}
</FormItem>


```

**Rule.validate** `validate(checkFn, message)`
简化`ant-form` `validator`写法, 根据传入的`checkFn`判断是否满足验证条件

```javascript
Rule.validate(value => value > 10, "请输入大于10的整数");
```

**Rule.integer** `integer(message = '请输入整数')`
整数`validator`

message参数可选，如未传入则使用默认值(示例中的message即为各个rule的默认值)

```javascript
Rule.integer('请输入整数');
```

除了`integer`，`Rule`还支持如下格式的判断

```javascript
Rule.integer('请入整数'),
Rule.negtiveInteger('请输入非负数'),
Rule.positiveInteger('请输入正整数'),
Rule.idCard('请输入身份证'),
Rule.postalCode('请输入邮政编码'),
Rule.uri('请输入uri'),
Rule.url('请输入url'),
Rule.email('请输入email'),
Rule.phone('请输入手机号'),
Rule.chinese('请输入中文'),
Rule.json('请输入json格式的字符'),
```

**Rule.required** `required(message = '', isRequired = true)`
非空校验

```javascript
Rule.required('请输入xxx');
```

**Rule.matches** `matches(/d/, message)`
正则校验

**Rule.inRange** `inRange(start, end, message)`
整数区间校验, message支持参数匹配符

```javascript
Rule.inRange(5, 10, '请输入$1-$2之间的整数'); //如果校验不通过，则显示 请输入5-10之间的整数
```

更多rule参考如下示例:

```javascript
Rule.inRange(5, 10, '请输入$1-$2之间的整数'),
Rule.greaterThan(5, '请输入大于$1的整数'),
Rule.lessThan(10, '请输入小于$1的整数'),
Rule.includes('56qq', '请输入包含$1关键字的字符'),
Rule.minLength(5, '请至少输入$1个字符'),
Rule.maxLength(10, '请不要超出$1个字符'),
Rule.inRangeLen(5, 10, '请输入$1-$2个字符'),
Rule.endsWith('com', '请输入以$1结尾的字符'),
Rule.startsWith('http', '请输入以$1开头的字符'),

#### Regex

封装常用的正则表达式

```javascript
Regex.Chinese, // 中文
Regex.DoubleCharacter // 双字节
Regex.Phone // 移动手机号
Regex.Email // email
Regex.URI // uri
Regex.URL // url
Regex.QQ // qq
Regex.PostalCode // 邮政编码
Regex.IDCard // 身份证
Regex.Integer // 整数
Regex.PositiveInteger // 正整数
Regex.NegtiveInteger // 负整数
Regex.NonPositiveInteger // 非正整数
Regex.NonNegtiveInteger // 非负整数
```

#### localStorage

封装了Html5标准的localStorage，使其具有更良好和便捷的操作性

```javascript
// Number
localStorage.number = 110;
console.log(typeof localStorage.number); // number

// String
localStorage.string = 'string';
console.log(typeof localStorage.string); // string

// Boolean
localStorage.bool = true;
console.log(typeof localStorage.bool); // boolean

// undefined
localStorage.undefined = undefined;
console.log(typeof localStorage.undefined); // undefined

// object
localStorage.obj = { value: 'object', name: { first: 'yang' } };
console.log(typeof localStorage.obj); // object

// array
localStorage.arr = [[1, 2, 3]];
console.log(typeof localStorage.arr); // array

// 支持本身的 setItem、getItem、removeItem、clear
```




