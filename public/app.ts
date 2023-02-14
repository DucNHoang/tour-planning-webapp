// Required for referencing .vue files in .ts files.
// Reference is passed onto all child components
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../vue-shims.d.ts" />

import vue from 'vue'
import vueRouter from 'vue-router'
import vuex from 'vuex'

vue.use(vueRouter)
vue.use(vuex)

import baseVue from './components/base.vue'
import { router } from './router'
import { store } from './store' // Store must come after vuex

new vue({
  router,
  store,
  el: '#app',
  template: '<base-vue />',
  components: { baseVue },
}).$mount('#app')
