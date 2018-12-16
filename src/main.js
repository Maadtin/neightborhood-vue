import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import * as VueGoogleMaps from 'vue2-google-maps';

import googleMapsConfig from './google'

import Vuetify from 'vuetify';


import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false;

Vue.use(VueGoogleMaps, googleMapsConfig);
Vue.use(Vuetify);

new Vue({
  render: h => h(App),
}).$mount('#app');
