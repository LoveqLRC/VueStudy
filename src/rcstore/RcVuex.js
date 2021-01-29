let Vue

// eslint-disable-next-line no-unused-vars
function install(_Vue){
    //install方法会传入vue对象，
    //保存vue对象
    Vue =_Vue
    Vue.mixin({
        beforeCreate(){
            console.log('create')
        }
    })
}

export default {
    install
}