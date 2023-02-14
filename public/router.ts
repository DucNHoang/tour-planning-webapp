// Required for referencing .vue files in .ts files.
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../vue-shims.d.ts" />

import vueRouter from 'vue-router'

const DriverManagementVue = lazyLoadComponent('./components/DriverManagement')
const TourManagementVue = lazyLoadComponent('./components/TourManagement')

const routes = [
  { path: '/', redirect: '/driver' },

  { path: '/driver', component: DriverManagementVue },
  { path: '/tour', component: TourManagementVue },
]

const router = new vueRouter({
  routes,
})

// https://router.vuejs.org/guide/advanced/lazy-loading.html#grouping-components-in-the-same-chunk
function lazyLoadComponent(componentFilePath: string): any {
  return () => import(`${componentFilePath}.vue`)
}

export { router }
