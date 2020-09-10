import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Admin from '@/components/Admin'
import Logon from '@/components/Logon'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/admin/:type',
      component: Admin
    },
    {
      path: '/logon',
      name: 'Logon',
      component: Logon
    },
    {
      path: '*',
      redirect: '/login'
    }
  ],
  mode: 'history'
})
