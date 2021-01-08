<template>
    <div>
        <!-- 自定义组件双向邦定 :value  @input -->
        <!-- v-bind="$attrs"展开$attrs -->
        <input :type="type"  :value="value" @input="onInput"  v-bind="$attrs">
    </div>
</template>

<script>
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