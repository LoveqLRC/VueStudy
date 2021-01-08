<template>
    <div>
        <Child>
            <template v-slot:default="account">
                默认插槽用default做参数{{account.username}}
            </template>

            <template v-slot:content>
                具名插槽用插槽名做参数
            </template>
        </Child>
    </div>
</template>

<script>
 import Child  from '@/components/communication/Child.vue'
export default {
    components: {
        Child,
    },
}
</script>

<style lang="scss" scoped>

</style>