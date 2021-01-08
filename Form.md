## 双向绑定v-model实现
实现双向绑定，需要在子组件中实现下面两个条件
1. :value 
2. @input

> RcInput.vue

```html
<template>
    <div>
        <!-- 自定义组件双向邦定 :value  @input -->
        <input :type="type"  :value="value" @input="onInput" >
    </div>
</template>

<script>
    export default {
        props:{
            value:{
                type:String,
                default:""
            },
            type:{
                type:String,
                default:"text"
            }
        },
        methods: {
            onInput(e) {
                //派发一个input事件即可
                this.$emit("input",e.target.value)
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>
```

>index.vue

```html
<template>
    <div>
        <RcInput v-model="userInfo.userName"></RcInput>
        <div>{{userInfo.userName}}</div>
    </div>
</template>

<script>
    import RcInput from "@/components/form/RcInput.vue"


    export default {
        components: {
            RcInput,
        },

        data() {
            return {
                userInfo: {
                    userName:"",
                    age:""
                }
            }
        },
        
    }
</script>

<style lang="scss" scoped>

</style>
```

## 巧用$attrs适配input其他属性

`input`标签中还有很多属性，例如`placeholder`、`required`，这些属性都是常用的，但是不可能每个属性都在子组件中的`props`中声明，然后再传入`input`，这样带来了管理上的麻烦，难以维护，`$attrs`就是在这样的场景下，诞生的。


> tips:父组件传入了多个属性值，不在`props`中声明的属性将保存到`$attrs`中

> RcInput.vue
```html
        <!-- v-bind="$attrs"展开$attrs -->
        <input :type="type"  :value="value" @input="onInput"  v-bind="$attrs">
```

> index.vue

```html
    <RcInput v-model="userInfo.userName" placeholder="请输入用户名"></RcInput>
```


因为`placeholder`是通过`RcInput`传入到`input`中，所以`RcInput`中，也有`placeholder`残留，如下图

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b800ee3d2edb4bc2a6f75dc4c6ab8fbb~tplv-k3u1fbpfcp-watermark.image)

这时可以通过在属性添加`inheritAttrs: false`,避免设置到根元素上

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f75bb5a50a8e4fe6b93059c66b962860~tplv-k3u1fbpfcp-watermark.image)

> RcInput.vue

```js
    export default {
        inheritAttrs:false,//避免设置到根元素上
        props:{
            value:{
                type:String,
                default:""
            },
            type:{
                type:String,
                default:"text"
            }
        },
        ....
    }
```