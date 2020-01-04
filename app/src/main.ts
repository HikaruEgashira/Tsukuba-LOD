import Vue from 'vue';
import App from './Infrastructure/App.vue';
import './Infrastructure/registerServiceWorker';
import store from './Infrastructure/store';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';

Vue.use(Buefy);

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
