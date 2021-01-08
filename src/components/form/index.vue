<template>
    <div>
        <RcInput v-model="userInfo.userName" placeholder="请输入用户名"></RcInput>
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