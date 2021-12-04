<template>
  <div class="hello">
    <h1>要改变父组件的值：{{doc.title}}</h1>
    子组件要传过来的值：<Children :ftoc.sync='doc.title' :paramsObj='params'/>
    <component :is="componentId" ></component> 
    <button @click="changeC">点击这</button>
    <button @click="sendAjax">send</button>
    <button @click="canelSendBtn">cancel</button>

  </div>
</template>

<script>
import axios from 'axios'
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
      cancelAjax:null,
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
    changeC(){
      this.componentId === 'childA'? this.componentId = 'childB':this.componentId = 'childA';
      console.log(this.componentId);
    },
    sendAjax () {
      axios({
        url: 'http://localhost:3000/getData',
        method: 'get',
        // 定义cancelToken参数，new一个axios.CancelToken实例，向该实例中传入执行器函数
        // c 是用于取消当前请求的函数
        // 将来取消请求时调用 cancel()
        cancelToken: new axios.CancelToken((c) => {
          this.cancelAjax = c
        })
      }).then((res) => {
        // 取消函数设置为 null 如果请求成功了 就不能取消了
        this.cancelAjax = null
        console.log('res', res.data)
      }).catch((err) => {
        this.cancelAjax = null
        console.log(err)
      })
    },
    canelSendBtn () {
      // 如果 cancelAjax 是一个函数 说明请求已发送 可以调用
    if (typeof this.cancelAjax === 'function') {
        this.cancelAjax('取消请求') // 
      } else {
        console.log('没有可取消的请求')
      }
    }


  },
  created(){
    console.log(this.app.name);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
</style>
