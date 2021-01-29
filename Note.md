# Vue组件通信方式

 - `props`
 - `eventbus`
 - `vuex`
 - 自定义事件
   - 边界情况
     -  `$parent`
     -  `$children`
     -  `$root`
     -  `$refs`
     -  `provide/inject`
   - 非prop特性
     - `$attrs`
     - `$listeners`
  - 插槽
  
##  props
父传子
> Child.vue
```js
    props: {
      msg: {
        type: String,
        default: ''
      },
    },
```
> Parent.vue
```html
<Child msg="some msg from parent" ></Child>
```

## $emit
子传父

> Child.vue
```js
this.$emit('some-event', 'msg from child1')
```
> Parent.vue
```html
<Child msg="some msg from parent" @some-event="onSomeEvent"></Child>
```

     
## EventBus事件总线

任意两个组件之间传值常用事件总线

```js
class Bus{
   constructor() {
       this.callbacks={}
   }
   $on(name,fn){
       this.callbacks[name] = this.callbacks[name] || []
       this.callbacks[name].push(fn)
   }
   $emit(name,args){
       if(this.callbacks[name]){
            this.callbacks[name].forEach(fn => fn(args));
       }

   }
}

export default Bus

```

使用
```js
//发送事件
this.$bus.$emit('busEvent',"emit Msg")
//接收事件
  this.$bus.$on('busEvent',(msg)=>{

        console.log(msg)
      })
```
  
> 实践中通常用Vue代替Bus，因为Vue已经实现了相应接口

## Vuex

创建唯一的全局数据管理者store，通过它管理数据并通知组件状态变更。


## $parent / $root
兄弟组件之间通信可通过共同祖辈搭桥，`$parent`或`$root`。

```js
// 两个child需在同一个parent下
//child1
this.$parent.$on('foo',handle)
//child2
this.$parent.$emit('foo')
```

##  $children
父组件可以通过$children访问子组件实现父子通信

```js
//parent
this.$children[0].xx='xxx'
```
>注意：$children不能保证子元素顺序

## $attrs / $listeners

包含了父作用域中不作为 `prop` 被识别 (且获取) 的特性绑定 (`class`和`style`除外)。当一个组件没有声明任何 `prop` 时，这里会包含所有父作用域的绑定 (`class`和`style`除外)，并且可以通过`v-bind="$attrs"`传入内部组件——在创建高级别的组件时非常有用。


> Child.vue

子组件`props`里面只声明了`msg`属性
```js
    props: {
      msg: {
        type: String,
        default: ''
      },
    },
```
>Parent.vue

父组件传入了多个属性值，不在`props`中声明的属性将保存到`$attrs`中
```html
  <Child
    msg="some msg from parent" 
    name="rc在努力"
    age="18"
    ></Child>
```
打印输出
```html
    <!-- 输出{ "name": "rc在努力", "age": "18" } -->
    <p>{{$attrs}}</p>
```


> 应用场景：在饿了么ui组件中，有一个`el-input`组件，它是依赖于`input`组件实现的，有一些属性是要通过`el-input`传到`input`中，例如`placeholder`，然而这些属性是`el-input`用不到的，`input`能用到的，那么就可以通过`v-bind="$attrs"`传递给`input`


## $refs

>Parent.vue

```html
  <Child
    msg="some msg from parent" 
    ref="child"
    ></Child>
```

```js
  this.$refs.child.xx = xx
```


## provide/inject

>Parent.vue

```js
  export default {
    provide() {
      return {
        foo: 'foooooooooo'
      }
    },
  }
```

>Child.vue

```js
  // <p>{{foo}}</p>
  export default {
    inject: ['foo'],
  }
```
## 插槽

插槽语法是Vue 实现的内容分发 API，用于复合组件开发。该技术在通用组件库开发中有大量应用。

### 匿名插槽

> Child.vue
```html
<div>
        <slot></slot>
</div>
```

> Parent.vue

```html
     <Child>parent msg</Child>
```

### 具名插槽

将内容指定分发到子组件指定内容


> Child.vue
```html
 <div>
        <slot></slot>
        <slot name="content"></slot>     
  </div>
```


> Parent.vue

```html
     <Child>
            <template v-slot:default>
                默认插槽用default做参数
            </template>

            <template v-slot:content>
                具名插槽用插槽名做参数
            </template>
    </Child>
```

### 作用域插槽
子组件传参给父组件
> Child.vue
```html
   <div>
        <slot username="rc"></slot>
    </div>
```


> Parent.vue

```html
     <Child>
            <template v-slot:default="account">
                来自子组件的数据{{account.username}}
            </template>
        </Child>
```