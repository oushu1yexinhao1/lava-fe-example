// 微前端框架需要的 public path
import './public-path'
import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import store from './store/index'
import { Spin, ConfigProvider, message } from 'ant-design-vue-3'

import SvgIcon from './components/Icon.vue'
import DefaultSpin from './smart-ui-vue/helper/DefaultSpin.vue'
import i18n from 'lava-fe-lib/lib-vue-plugin/i18n'

// dayjs 相关
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import customParseFormat from 'dayjs/plugin/customParseFormat'

// 样式相关
import 'normalize.css'
import 'csshake'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const modifyVars = require('/src/smart-ui-vue/modifyVars')

interface GlobalProps {
  container: any,
  onGlobalStateChange: (state?: any, prev?: any) => void,
  setGlobalState: (state?: any) => void
}

// dayjs 设置日期
dayjs.locale('zh-cn')
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(customParseFormat)

// 设置默认 loading
Spin.setDefaultIndicator({
  indicator: DefaultSpin
})

// 配置 ant-design-vue-3 的 ConfigProvider
ConfigProvider.config({
  prefixCls: modifyVars['@ant-prefix'],
})

const APP_NAME = process.env.VUE_APP_NAME
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
  instance.use(message)

  // 统一注册 svg-icon 组件
  instance.component('svg-icon', SvgIcon)

  // i18n
  instance.use(i18n)

  instance.mount(container ? container.querySelector(`#${APP_NAME}-app`) : `#${APP_NAME}-app`)

  // 遍历 require.context 的返回模块，并导入
  const requireAll = (requireContext: any) => requireContext.keys().map(requireContext)

  // 首屏加载性能优化
  setTimeout(() => {
    // import 所有符合条件的 svg 三个参数：文件夹、是否使用子文件夹、正则
    const req = require.context('./assets/icons', true, /\.svg$/)
    const req2: any = require.context('./smart-ui-vue/assets/icons', true, /\.svg$/)
    requireAll(req)
    requireAll(req2)
  })
}

// 独立运行时
if (!(window as any).__POWERED_BY_QIANKUN__) {
  render()
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export async function bootstrap() {}

// eslint-disable-next-line require-await
export async function mount(props: any) {
  render(props)
}

// eslint-disable-next-line require-await
export async function unmount() {
  instance.unmount()
  instance = null
}
