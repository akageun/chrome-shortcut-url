import Vue from 'vue'
import App from './App'

import 'expose-loader?$!expose-loader?jQuery!jquery'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    render: h => h(App)
})
