# 从使用`Vuex`的角度，手写一个高仿`Vuex`

## Vue.use里面做了什么？

在使用`Vuex`中，调用了`Vue.use`方法，把`Vuex`注入到`Vue`中
```
import Vuex from 'vuex'
Vue.use(Vuex)
```

当调用`Vue.use`其实是会调用对象的`install`方法。

照葫芦画瓢，创建`RcVuex.js`文件，实现`install`方法

>rcstore/RcVuex.js

```js
let Vue
function install(_Vue){
    //install方法会传入vue对象，
    //保存vue对象
    Vue =_Vue
}

export default {
    install
}
```

## Vue对象里面传入store，是为了什么？

在使用`Vuex`中，在`Vue`对象中传入了`store`对象

```js
new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
```

`store`中存放着`state`、`mutations`和`actions`等，查看`vue`的构造方法，发现并没有声明`store`在其中，那么这里传入的意义是什么呢？ 回想在使用`Vuex`的过程中，可以在任何页面调用`$store`对象，再结合上面的`install`方法返回`Vue`对象，可以在`install`里面做些事

>rcstore/RcVuex.js
```js
```





