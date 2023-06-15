import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import * as THREE from 'three'
import './utils/rem'
import './utils/CSS3DRenderer'
import './utils/TrackballControls'

Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$three = THREE
new Vue({
  router,
  el: '#app',
  render: h => h(App)
}).$mount('#app')
