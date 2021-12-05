import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import common from './assets/common'
import VueResource from 'vue-resource'

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(common);
Vue.use(VueResource);
Vue.prototype.$name = 'zhangsan';
new Vue({
  render: h => h(App),
}).$mount('#app')

