<template>
    <div>
        isLogin:{{isLogin}}
        <div @click="modifyState">修改</div>
        <div @click="login">登录</div>
    
    </div>
</template>

<script>
import {mapState,mapMutations,mapActions} from 'vuex'
    export default {
        computed: {
           ...mapState(['isLogin'])
        },
        methods: {
            modifyState() {
                // this.$store.state.isLogin = true
                // this.$store.commit('login')
                this.mutationsLogin()
            },
            login(){
            //    this.$store.dispatch('login','rc')         
                this.actionLogin('rc')
            },
            ...mapMutations({
                //mapMutations别名，意在解决方法名字冲突的问题，
                //this.mutationsLogin() 等价于 this.$store.commit('login')
                mutationsLogin:'login'
            }),
            ...mapActions({
                actionLogin:"login"
            })
        },
  
    }
</script>

<style lang="scss" scoped>

</style>