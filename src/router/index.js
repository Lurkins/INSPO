import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../components/Home.vue';
import Items from '../components/Items.vue';
import Test from '../components/Test.vue';
import EditItem from '../components/EditItem.vue';
import Profile from '../components/Profile.vue';
import MyItems from '../components/MyItems.vue';

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
      path: '/myitems',
      name: 'MyItems',
      component: MyItems,
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
