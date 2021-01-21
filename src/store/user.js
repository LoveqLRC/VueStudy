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