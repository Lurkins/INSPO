import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../components/Home.vue';
import Tasks from '../components/Tasks.vue';
import Test from '../components/Test.vue';
import EditItem from '../components/EditItem.vue';
import Profile from '../components/Profile.vue';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/tasks',
      name: 'Tasks',
      component: Tasks,
    },
    {
      path: '/test',
      name: 'Test',
      component: Test,
    },
    {
      path: '/edit/:id',
      name: 'EditItem',
      component: EditItem,
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
    },
  ],
  // eslint-disable-next-line
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});
