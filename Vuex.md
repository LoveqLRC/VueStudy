# Vuex是什么
Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。 可以帮助我们管理共享状态。

# 安装
```
vue add vuex
```

# State

将全局状态定义在`state`中

```js
export default new Vuex.Store({
  state: {
    isLogin:false
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
```

# Mutation

修改`state`只能通过`Mutation`，一条重要的原则就是要记住 `mutation` 必须是同步函数。

```js
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
  },
  modules: {
  }
})
```

# 获取和修改状态


## 获取
获取有两种方式
- 对`$store`直接访问
- `mapState`



### store

```html
   <div>
        isLogin:{{$store.state.isLogin}}
    </div>
```
### mapState

```html
<template>
    <div>
        isLogin:{{isLogin}}
    </div>
</template>

<script>
import {mapState} from 'vuex'
    export default {
        computed: {
           ...mapState(['isLogin'])
        },
    }
</script>

<style lang="scss" scoped>

</style>
```

## 修改
修改也有两种方式
- 通过`$store`进行操作
- `mapMutation`

### store

```html
<template>
    <div>
        isLogin:{{isLogin}}
        <div @click="modifyState">修改</div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
    export default {
        computed: {
           ...mapState(['isLogin'])
        },
        methods: {
            modifyState() {
                this.$store.commit('login')
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>
```

### mapMutation

```html
<template>
    <div>
        isLogin:{{isLogin}}
        <div @click="modifyState">修改</div>
    </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
    export default {
        computed: {
           ...mapState(['isLogin'])
        },
        methods: {
            modifyState() {
                this.login()
            },
            ...mapMutations(['login'])
        },
  
    }
</script>

<style lang="scss" scoped>

</style>
```

> 事实上是可以通过` this.$store.state.isLogin = true`这样直接修改全局状态，但是官方不建议这样处理，可以通过[严格模式](https://vuex.vuejs.org/zh/guide/strict.html)监控这一行为。


# ACTION
`Action` 类似于 `mutation`，不同在于：

- `Action` 提交的是 `mutation`，而不是直接变更状态。
- `Action` 可以包含任意异步操作。

```js
import Vue from 'vue'
import Vuex from 'vuex'

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
  modules: {
  }
})

```

```html
<template>
    <div>
        isLogin:{{isLogin}}
        <div @click="modifyState">修改</div>
        <div @click="login">登录</div>
    
    </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
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
               this.$store.dispatch('login','rc')         
            },
            ...mapMutations({
                //mapMutations别名，意在解决方法名字冲突的问题，
                //this.mutationsLogin() 等价于 this.$store.commit('login')
                mutationsLogin:'login'
            })
        },
  
    }
</script>

<style lang="scss" scoped>

</style>

```

和上面的一样，除了可以通过`store`进行`dispatch`外，还可以通过`mapActions`达到相同的效果

```html
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
```

