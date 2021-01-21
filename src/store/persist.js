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