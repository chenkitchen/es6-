<template>
  <div class="hello">
    <h1>要改变父组件的值：{{doc.title}}</h1>
    子组件要传过来的值：<Children :ftoc.sync='doc.title' :paramsObj='params'/>
    <component :is="componentId" ></component> 
    <button @click="changeC">点击这</button>
    <button @click="sendAjax" >send</button>
    <button @click="canelSendBtn">cancel</button>
    <input type="file" id="file"  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
    <a href="javascript:selectFile">加载本地excel文件</a>
    <p>
      <svg xmlns='http://www.w3.org/2000/svg'>
        <path d="M50,50A50,50 0 1,1 100,100" style="stroke:#660000; fill:none;"></path>
      </svg>
    </p>
    <div id="box">
      <!-- 下方div -->
    <div class="bottom">
        <a href="www.baidu.com">bottom-百度</a>
    </div>
    <!-- 上方div -->
    <div class="top"></div>
    </div>
  </div>
</template>

<script>
import {get} from '../request/http.js';
import Children from './children.vue';
import childA from './childA.vue';
import childB from './childB.vue';
export default {
  
  name: 'HelloWorld',
  components:{Children,childA,childB},
  props: {
    msg: String,
  },
  inject:['app'],
  data(){
    return {
      //cancelAjax:null,
      componentId:'childB',
      title:'单一',
      doc:{
        title:'未改变的标题'
      },
      params: {
          type: "water",
          tabList: [
              {
                  name: "浓度数据",
                  id: "ND"
              },
              {
                  name: "水域水质分析",
                  id: "SY"
              }
          ],
          tableFixedHeader: [
              {name:'时间',code:'DT',isFixed:true},
          ]
      },

    }
  },
  methods:{
    selectFile() {
            document.getElementById('file').click();
        },
    changeC(){
      this.componentId === 'childA'? this.componentId = 'childB':this.componentId = 'childA';
      console.log(this.componentId);
    },
    sendAjax () {
      //  this.sendAjaxRandom();
      // this.canelSendBtn();
      get('/api/getData').then((res) => {
        // 取消函数设置为 null 如果请求成功了 就不能取消了
        // this.cancelAjax = null
        console.log('res', res.data)
      }).catch((err) => {
        // this.cancelAjax = null
        console.log(err)
      })
    },
    // sendAjaxRandom () {
    //   axios({
    //     url: '/api/getRandomData',
    //     method: 'get',
    //   }).then((res) => {
    //     // 取消函数设置为 null 如果请求成功了 就不能取消了
    //     this.cancelAjax = null
    //     console.log('res', res.data)
    //   }).catch((err) => {
    //     console.log(err)
    //   })
    // },
    canelSendBtn () {
      // 如果 cancelAjax 是一个函数 说明请求已发送 可以调用
    if (typeof this.cancelAjax === 'function') {
        this.cancelAjax() // 
      } else {
        console.log('没有可取消的请求')
      }
    }


  },
  created(){
    console.log(this.app.name);
    console.log(typeof null);//object
    let arrr = [
      {name:'zhangsan',age:30},{name:'lishi',age:40},{name:'zhangsan',age:30},{name:'zhangsan',age:30},{name:'zhangsan',age:30}
    ];
    let arr1 = [];
    arrr.map(item=>{
       arr1 =[...new Set([...arr1,item.name])];
    })
    console.log(arr1);
  }
}
</script>
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#box{
  position: relative;
}
.bottom {
    background: yellow;
    width: 100px;
    height: 100px;
}
.top {
    width: 100px;
    height: 100px;
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
}
</style>
