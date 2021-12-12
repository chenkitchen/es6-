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
    <table border="1px" cellpadding="10px" cellspacing="5px" align="center">
        <tr align="center">
            <td colspan="4"><input type="text" id="res" size="35px" value="" style="text-align:right;"/></td>
        </tr>
        <tr align="center">
            <td><input type="button" value="power" @click="calc"/></td>
            <td><input type="button" value="clear" @click="calc"/></td>
            <td colspan="2"><input type="button" value="      back      " @click="calc"/></td>
        </tr>
        <tr align="center">
            <td><input type="button" value="   1   " @click="calc"/></td>
            <td><input type="button" value="   2   " @click="calc"/></td>
            <td><input type="button" value="   3   " @click="calc"/></td>
            <td><input type="button" value="   +   " @click="calc"/></td>
        </tr>
        <tr align="center">
            <td><input type="button" value="   4   " @click="calc"/></td>
            <td><input type="button" value="   5   " @click="calc"/></td>
            <td><input type="button" value="   6   " @click="calc"/></td>
            <td><input type="button" value="   -    " @click="calc"/></td>
        </tr>
        <tr align="center">
            <td><input type="button" value="   7   " @click="calc"/></td>
            <td><input type="button" value="   8   " @click="calc"/></td>
            <td><input type="button" value="   9   " @click="calc"/></td>
            <td><input type="button" value="   *   " @click="calc"/></td>
        </tr>
        <tr align="center">
            <td><input type="button" value="   0    " @click="calc"/></td>
            <td><input type="button" value="   =    " @click="calc"/></td>
            <td><input type="button" value="   %    " @click="calc"/></td>
            <td><input type="button" value="   /    " @click="calc"/></td>
        </tr>
    </table>
    <select name="province" id="province" @change="chooseCity">
        <option selected="selected" disabled="disabled">---请选择您的省份---</option>
        <option value="0">湖南</option>
        <option value="1">湖北</option>
        <option value="2">广东</option>
    </select>
    <select name="city" id="city">
        <option selected="selected" disabled="disabled">---请选择您的城市---</option>
    </select>


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
      cities:new Array(3),

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
    },
    calc(event){
            console.log(event.target.value);
            // test 
           // window.alert(event.target.value);
            
            var val = new String(event.target.value);
            // clear space
            val = val.trim();
            var res = document.getElementById("res");
            // clear
            if(val == "clear"){
                res.value = "";
            }

            // back
            if(val == "back"){
                res.value = res.value.substring(0, res.value.length - 1);
            }

            //  power
            if(val == "power"){
                val = "p";
            }
            // add val to text
            if(val.length == 1 && val != "="){
                res.value = res.value + val;
            }

            // calc result
            if(val == "="){
                var arr;
                var result;
                // power
                if(res.value.indexOf("p") != -1){
                    arr = res.value.split("p");
                    //window.alert(arr);
                     result = Math.pow(parseFloat(arr[0]) ,parseFloat(arr[1]));
                    //window.alert(res);
                    res.value = result;
                } 			
                // plus
                if(res.value.indexOf("+") != -1){
                    arr = res.value.split("+");
                    //window.alert(arr);
                     result = parseFloat(arr[0]) + parseFloat(arr[1]);
                    //window.alert(res);
                    res.value = result;
                } else if(res.value.indexOf("-") != -1){
                    // minus
                    arr = res.value.split("-");
                    //window.alert(arr);
                    result = parseFloat(arr[0]) - parseFloat(arr[1]);
                    //window.alert(res);
                    res.value = result;
                } else if(res.value.indexOf("*") != -1){
                    // multiply
                    arr = res.value.split("*");
                    //window.alert(arr);
                    result = parseFloat(arr[0]) * parseFloat(arr[1]);
                    //window.alert(res);
                    res.value = result;
                } else if(res.value.indexOf("/") != -1){
                    // division
                    arr = res.value.split("/");
                    //window.alert(arr);
                    result = parseFloat(arr[0]) / parseFloat(arr[1]);
                    //window.alert(res);
                    res.value = result;
                } else if(res.value.indexOf("%") != -1){
                    // module
                    arr = res.value.split("%");
                    //window.alert(arr);
                    result = parseFloat(arr[0]) % parseFloat(arr[1]);
                    //window.alert(res);
                    res.value = result;
                }
            }	
    },
    $$(id) {
      return document.getElementById(id);
    },
    chooseCity(val) {
      // 获取id为city的结点
      console.log(val.target.value);
      let index = val.target.value;
      var cityEle = this.$$("city");
      // 初始化方法
      // 1.选项设置为0
      // cityEle.options = 0;
      // 2.删除所有子结点
      for (let i = 0; i < cityEle.childNodes?.length;) {
        // 删除时，数组会自动变小，所以无需自增
        // window.alert(cityEle.childNodes.length);
        cityEle.removeChild(cityEle.childNodes[i]);
      }
	
      for(let i = 0; i < this.cities[index]?.length; i++) {
        var cityText = document.createTextNode(this.cities[index][i]);
        var cityNode = document.createElement("option");
        var cityAttr = document.createAttribute("value");
        cityAttr.value = i;
        cityNode.setAttributeNode(cityAttr);
        cityNode.appendChild(cityText);
        cityEle.appendChild(cityNode);
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
    this.cities[0] = new Array("长沙市","株洲市","湘潭市","衡阳市","邵阳市","岳阳市","常德市","张家界市","益阳市","郴州市","永州市","怀化市","娄底市","湘西土家族苗族自治州");
    this.cities[1] = new Array("武汉市","黄石市","十堰市","宜昌市","襄樊市","鄂州市","荆门市","孝感市","荆州市","黄冈市","咸宁市","随州市","恩施土家族苗族自治州","仙桃市","潜江市","天门市","神农架林区");
    this.cities[2] = new Array("广州市","韶关市","深圳市","珠海市","汕头市","佛山市","江门市","湛江市","茂名市","肇庆市","惠州市","梅州市","汕尾市","河源市","阳江市","清远市","东莞市","中山市","潮州市","揭阳市","云浮市");

  },
  
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
