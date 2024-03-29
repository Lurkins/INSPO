import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../components/Home.vue';
import Items from '../components/Items.vue';
import MyItems from '../components/MyItems.vue';
import EditItem from '../components/EditItem.vue';
import Profile from '../components/Profile.vue';
import SignUp from '../components/SignUp.vue';
import SignOut from '../components/SignOut.vue';
import LogIn from '../components/LogIn.vue';

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
      path: '/items',
      name: 'Items',
      component: Items,
    },
    {
      path: '/edit/:id',
      name: 'EditItem',
      component: EditItem,
    },
    {
      path: '/myitems',
      name: 'MyItems',
      component: MyItems,
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp,
      props: true,
    },
    {
      path: '/login',
      // name: 'LogIn',
      component: LogIn,
      props: true,
    },
    {
      path: '/signout',
      component: SignOut,
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      props: true,
    },
  ],
  // eslint-disable-next-line
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});
