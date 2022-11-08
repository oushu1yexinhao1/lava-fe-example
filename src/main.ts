// 微前端框架需要的public path
import './public-path'
import { createApp } from 'vue'
import App from './App.vue'
import store from './store/index'
import { Spin, ConfigProvider } from 'ant-design-vue'
import { ConfigProvider as ConfigProviderV3, } from 'ant-design-vue-3'
import router from './routes'
import SvgIcon from './components/Icon.vue'
import DefaultSpin from './smart-ui-vue/helper/DefaultSpin.vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import i18n from 'lava-fe-lib/lib-vue-plugin/i18n'

interface GlobalProps {
  container: any,
  onGlobalStateChange: (state?: any, prev?: any) => void,
  setGlobalState: (state?: any) => void
}

// 设置dayjs
dayjs.locale('zh-cn')

// 设置默认loading
Spin.setDefaultIndicator({
  indicator: DefaultSpin
})

// 配置antd-vue-3的configprovider
// 2的在App.vue上配置
// eslint-disable-next-line @typescript-eslint/no-var-requires
const modifyVars = require('/src/smart-ui-vue/modifyVars')
ConfigProvider.config({
  prefixCls: modifyVars['@ant-prefix'],
})

let instance: any = null
function render(props: GlobalProps = { container: null, onGlobalStateChange: () => 0, setGlobalState: () => 0 }) {
  // vuex store 添加全局监听器
  /**
   * 使用方法
   * 取值：
   * state.global.data.xxx
   * 赋值：
   * commit('setGlobalState', { foo: xxx })
   * 示例：
   * const { state, commit } = useStore()
   * const foo = computed(() => state.global.data?.foo)
   * const addFoo = () => {
   *       console.log(11111, state)
   *       commit('setGlobalState', { foo: Math.random() })
   *     }
   */
  const { container, onGlobalStateChange } = props
  store.commit('global/initGlobalProps', props)

  instance = createApp(App)
  instance.use(router)
  instance.use(ConfigProvider)
  instance.use(store)

  // 统一注册svg-icon组件
  instance.component('svg-icon', SvgIcon)

  // i18n
  instance.use(i18n)

  // 遍历require.context的返回模块，并导入
  const requireAll = (requireContext: any) => requireContext.keys().map(requireContext)

  // import所有符合条件的svg 三个参数：文件夹、是否使用子文件夹、正则
  const req = require.context('./assets/icons', true, /\.svg$/)
  const req2: any = require.context('./smart-ui-vue/assets/icons', true, /\.svg$/)
  requireAll(req)
  requireAll(req2)
  instance.mount(container ? container.querySelector('#app') : '#app')
}

// 独立运行时
if (!(window as any).__POWERED_BY_QIANKUN__) {
  render()
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export async function bootstrap() {
}

// eslint-disable-next-line require-await
export async function mount(props: any) {
  render(props)
}

// eslint-disable-next-line require-await
export async function unmount() {
  instance.unmount()
  instance = null
}
