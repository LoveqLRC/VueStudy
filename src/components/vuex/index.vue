<template>
    <div>
        isLogin:{{isLogin}}
        <div @click="modifyState">修改</div>
        <div @click="login">登录</div>
        <div>{{$store.getters.welcome}}</div>
        <div>{{this.welcomeTips}}</div>
        <div>用户名：{{this.$store.state.user.username}}</div>
        <div>{{username}}</div>
        <button @click="getUserInfos">获取用户信息</button>
    </div>
</template>

<script>
import {mapState,mapMutations,mapActions, mapGetters} from 'vuex'
    export default {
        computed: {
           ...mapState(['isLogin']),
            ...mapState('user',['username'])
           ,...mapGetters({
               welcomeTips:'welcome'
           })
        },
        methods: {
            getUserInfos(){
                this['user/getUserInfo']()
            },
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
            }),
            ...mapActions(['user/getUserInfo'])
        },
  
    }
</script>

<style lang="scss" scoped>

</style>