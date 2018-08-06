import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@components/HelloWorld.vue'
import SignInPage from '@pages/SignInPage.vue'
import SignOutPage from '@pages/SignUpPage.vue'
import DashboardPage from '@pages/DashboardPage.vue'
import IndexPage from '@pages/IndexPage.vue'

//import BaseRouters from '@applications/Base/router.ts'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexPage,
      children: [
  {
      path: 'dashboard',
      component: DashboardPage,
      meta: {title: "Dashboard"}
  }]
    },
    // {
    //   path: '/applications',
    //   name: 'HelloWorld',
    //   component: HelloWorld,
    //   children: BaseRouters,
    //   meta: {title: "Base"}
    // },
    {
      path: '/signin',
      name: 'signin',
      component: SignInPage,
      meta: {title: "Sign In"}
    },
    // {
    //   path: '/dashboard',
    //   name: 'dashboard',
    //   component: Dashboard,
    //   meta: {title: "Dashboard"}
    // },
    {
      path: '/signup',
      name: 'signup',
      component: SignOutPage,
      meta: {title: "Sign Up"}
    },
    {
      path: '/logout',
      name: 'logut',
      //component: SignOut,
      meta: {title: "Logout"}
    }
  ]
})
