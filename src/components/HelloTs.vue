<template>
    <div>
            <p><input type="text" @keydown.enter="addFeature"></p>
            <ul>
                <li v-for="(feature,index) in features " :key="++index">{{feature}}</li>
            </ul>

            {{count}}
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class Hello extends Vue {
        //属性就是data
        features :string[]=[]; 
        
        //函数直接作为回调
        addFeature(e:KeyboardEvent){
            let input = e.target as HTMLInputElement
           this.features.push(input.value)
           input.value = ''
        }
        
        //如果和生命周期钩子同名，就是生命周期
        created () {
            this.features = ['类型注解','编译型语言']
        }
        //存取器用于计算属性

        get count():number{
            return this.features.length
        }
    }
</script>

<style scoped>

</style>