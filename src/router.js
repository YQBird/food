import VueRouter from 'vue-router';
import Goods from './components/goods/Goods';
import Ratings from './components/ratings/Ratings';
import Sellers from './components/sellers/Sellers';

const routes = [
  { path: '/', redirect: '/goods'},
  { path: '/goods', component: Goods },
  { path: '/ratings', component: Ratings },
  { path: '/sellers', component: Sellers}
]

const router = new VueRouter({
  routes,
  linkActiveClass: 'active'
});

export default router;