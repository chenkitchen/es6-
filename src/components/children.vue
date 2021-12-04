<template>
    <div>
        子组件1{{app.name}}
        <el-input v-model.number="data" type="number" @blur="inputOut" onKeypress="return(/[\d\.]/.test(String.fromCharCode(event.keyCode)))"></el-input>
    </div>
</template>

<script>
    export default {
        inject:['app'],
        props: { 
            paramsObj: {
            type:Object,
                default:() => {
                    return {
                    }
                }
            },
            ftoc:{
                
            }
        },
        computed:{
            againParams(){
                return Object.assign({
                    tabList: [],
                        tableFixedHeader: [],
                        showHandleCol:false,
                        handleType:[], 
                        isTagData:false,
                },this.paramsObj)
            }
        },
        data(){
            return {
                data:'',
            }
        },
        methods:{
            inputOut(val){
                if(this.data === 'e') this.data = ''
                console.log(val,this.data);
                this.$emit('update:ftoc',this.data);
            }
        },
        created(){
            console.log(this.app.name);
        },
        mounted(){
            console.log(this.paramsObj,this.againParams);
        }
    }
</script>

<style lang="scss" scoped>

</style>