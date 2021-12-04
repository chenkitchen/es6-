<template>
    <div @keydown="haha">
        组件A
        <input type="text">
    </div>
</template>

<script>
    export default {
        methods:{
            demo(){
                alert('只是测试');
            },
            haha(event){
                this.clickEnter(event,this.demo);
            }
        },
        mounted(){
            // this.haha(event);
        }
    }
</script>

<style  scoped >
div{
    height: 200px;
    
}
input{
        height: 150px;
    }
</style>