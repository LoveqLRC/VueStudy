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

修改`state`只能通过`Mutation`，一条重要的原则就是 `mutation` 必须是同步函数。

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



### 通过store

```html
   <div>
        isLogin:{{$store.state.isLogin}}
    </div>
```
### 通过mapState

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

### 通过store

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

### 通过mapMutation

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


先定义`Action`方法

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
                //dispatch进行耗时登录
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
                   //mapActions别名，意在解决方法名字冲突的问题，
                //this.actionLogin() 等价于  this.$store.dispatch('login','rc')   
                actionLogin:"login"
            })
        },
  
    }
</script>

<style lang="scss" scoped>

</style>
```



# Getters
可以使用`getters`从`store`的`state`中派生出一些状态。


> store/index.js

```
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin:false
  },
  ......
  getters: {
    welcome:state =>{
      return state.isLogin?"登录成功":"登录失败"
    }
  },
  ......
```

可以通过`store`访问，`$store.getters.welcome`,也可以通过`mapGetters`方法来访问

```js
<script>
import {mapState,mapMutations,mapActions, mapGetters} from 'vuex'
    export default {
        computed: {
            // 把 `this.welcomeTips` 映射为 `this.$store.getters.welcome`
           ...mapGetters({
               welcomeTips:'welcome'
           })
        },  
    }
</script>

```

# 模块化
使用`modules`定义多个子模块利于组件复杂状态

```js
export default{
    // 避免命名冲突   
    namespaced: true,
    state:{
        username:"rc"
    },
    actions: {
        getUserInfo(){
            console.log('getUserInfo')
        }
    }
}
```

> user.js

```
export default{
    // 避免命名冲突   
    namespaced: true,
    state:{
        username:"rc"
    }
}
```

使用
```html
        <div>用户名：{{this.$store.state.user.username}}</div>
```

另外一种方式
```js
       ...mapState('user',['username'])
```


`actions`修改方式

引入
```js
           ...mapActions(['user/getUserInfo'])
```
调用
```js
     this['user/getUserInfo']()
```

# 插件


`Vuex` 的 `store` 接受`plugins`选项，这个选项暴露出每次 `mutation` 的钩子。`Vuex` 插件就是一个函数，它接收 `store` 作为唯一参数


注册

```js
export default new Vuex.Store({
  plugins:[persistPlugin]
})
```

持久化实例
```js
export default store =>{

    //设置初始化状态
    if(localStorage){
        var isLogin  = JSON.parse(localStorage.getItem('isLogin'))
        if(isLogin){
            store.commit('login')
        }
    }
    //监听mutations变化
    store.subscribe((mutations,state)=>{
        if(mutations.type=='login'){
            localStorage.setItem('isLogin',JSON.stringify(state.isLogin))
        }   
    })
}
```