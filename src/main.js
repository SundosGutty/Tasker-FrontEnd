import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/store.js'
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en'
import "./styles/styles.scss"

//ICON
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome,faSortDown,faThLarge,faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {InlineSvgPlugin} from 'vue-inline-svg';

import VueDragResize from 'vue-drag-resize'

library.add(faUserSecret ,faHome, faThLarge,faSortDown)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.component('vue-drag-resize', VueDragResize)
//=====
Vue.use(InlineSvgPlugin);
Vue.config.productionTip = false
Vue.use(ElementUI , {locale})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  components:{
    EmojiPicker: window.EmojiPicker
  },
  render: h => h(App)
}).$mount('#app')
