import Vue from 'vue'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'

import App from './App.vue'
import bs5Modal from '../components/module/bs5-modal';

Vue.component('bs5Modal', bs5Modal);

new Vue({
  el: '#app',
  render: (h) => h(App),
})
