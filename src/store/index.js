import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import persistPlugin from './persist'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin:false
  },
  mutations: {
    login(state){
      state.isLogin = true
    },
    logout(state){
      state.isLogin = false
    }
  },
  actions: {
    login({commit},username){
      return new Promise((resolve,reject)=>{
          setTimeout(
            ()=>{
                if(username === 'rc' ){
                  commit('login')
                  resolve()
                }else{
                  reject()
                }
            }
          )
      })
    }
  },
  getters: {
    welcome:state =>{
      return state.isLogin?"登录成功":"登录失败"
    }
  },
  modules: {
    user
  },
  plugins:[persistPlugin]
})
