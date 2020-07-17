## localStorage

封装了Html5标准的localStorage，使其具有更良好和便捷的操作性
对于不支持Proxy语法的低版本浏览器，需要使用提供的API如：setItem、getItem、removeItem、clear来操作

### 如何使用

```javascript
import storage from 'carno/localStorage';

// Number
storage.number = 110;
console.log(typeof storage.number); // number

// String
storage.string = 'string';
console.log(typeof storage.string); // string

// Boolean
storage.bool = true;
console.log(typeof storage.bool); // boolean

// undefined
storage.undefined = undefined;
console.log(typeof storage.undefined); // undefined

// object
storage.obj = { value: 'object', name: { first: 'yang' } };
console.log(typeof storage.obj); // object

// array
storage.arr = [[1, 2, 3]];
console.log(typeof storage.arr); // array

// 支持本身的 setItem、getItem、removeItem、clear
```