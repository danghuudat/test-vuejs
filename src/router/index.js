import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import SecondComponent from '../components/SecondComponent'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/component/:hocluc',
      name: 'SecondComponent',
      component: SecondComponent

    }
  ]
})
