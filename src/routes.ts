import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import IndexPage from './pages/Index.vue'

const PREFIX = '/main/example'

const routes: RouteRecordRaw[] = [
  { path: '', component: IndexPage },
].map(item => {
  return { ...item, path: `${PREFIX}${item.path}` }
})


const router = createRouter({
  history: createWebHistory(''),
  routes,
})

export default router
