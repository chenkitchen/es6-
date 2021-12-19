<template>
    <div id="box">
        <p style="text-align:center">
            <img src="./cat.png" alt="cat"  style="position:relative" id="cat">
        </p>
        <p>{{showTime}}</p>
        <button @click="end">stop</button>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                cat:null,
                angle:Math.PI / 2,
                animationFrameId:null,
                showTime:null,
            }
        },
        mounted(){
             
            //  this.$nextTick(()=>{
            //      this.cat = document.querySelector('img');
            //  })
            // window.requestAnimationFrame(this.animate);
            this.start();
        },
        destroyed(){

        },
        methods:{
            animate(time,lastTime){
                let cat = document.querySelector('img');
                if(lastTime != null){
                    this.angle += (time - lastTime) * 0.001;
                }
                cat.style.top = (Math.sin(this.angle)*20) + 'px';
                cat.style.left = (Math.cos(this.angle)*200) + 'px';
                window.requestAnimationFrame(newTime => this.animate(newTime,time))
            },
            async start(){
                const f  = async ()=>{
                    // console.log('测试', new Date());
                    this.showTime = new Date().toLocaleString();
                     let cat = await document.getElementById("cat");
                     this.angle += 0.011;
                    cat.style.top = (Math.sin(this.angle)*20) + 'px';
                    cat.style.left = (Math.cos(this.angle)*200) + 'px';
                    this.animationFrameId = requestAnimationFrame(f)
                }
                if(!this.animationFrameId){
                    this.animationFrameId = requestAnimationFrame(f);
                }
                return true;
            },
            end(){
                cancelAnimationFrame(this.animationFrameId);
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