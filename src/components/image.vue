<template>
    <div id="box">
        <p style="text-align:center">
            <img src="./cat.png" alt="cat"  style="position:relative">
        </p>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                cat:null,
                angle:null,
            }
        },
        mounted(){
             
             this.$nextTick(()=>{
                 this.cat = document.querySelector('img');
             })
            this.angle = Math.PI / 2;
            requestAnimationFrame(this.animate);
        },
        methods:{
            animate(time,lastTime){
                if(lastTime != null){
                    this.angle += (time - lastTime) * 0.001;
                }
                this.cat.style.top = (Math.sin(this.angle)*20) + 'px';
                this.cat.style.left = (Math.cos(this.angle)*200) + 'px';
                requestAnimationFrame(newTime => this.animate(newTime,time))
            }
        }
    }
</script>

<style  scoped>
#box{
    width: 100%;
    height: 400px;
    background-color: skyblue;
    margin-top: 50px;
}
</style>