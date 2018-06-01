import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/Home'
import Gallery from '../components/Gallery'

Vue.use(VueRouter)

export default new VueRouter({
  base: '/',
  mode: 'history',
  routes: [{
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/:slug',
      name: 'Gallery',
      component: Gallery
    }
  ]
})
