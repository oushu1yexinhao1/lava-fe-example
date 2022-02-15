import './public-path'
import { createApp } from 'vue'
import App from './App.vue'
// @ts-ignore
import store from './store/index.js'
import 'normalize.css'
import 'csshake'
import {
  Menu, Dropdown, Button, ConfigProvider,
  Input, Tabs, Form, Card, Modal, Checkbox, Steps,
  Avatar, Table, Drawer, Space, Select, DatePicker, TimePicker, Tag,
  Pagination, Tooltip, Spin
} from 'ant-design-vue'
import router from './routes'
import SvgIcon from './components/Icon.vue'
import DefaultSpin from './smart-ui-vue/helper/DefaultSpin.vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import i18n from 'lava-fe-lib/lib-vue-plugin/i18n'

// 设置日期
dayjs.locale('zh-cn')

// 设置默认loading
Spin.setDefaultIndicator({
  indicator: DefaultSpin
})

let instance:any = null

function render(props = {}) {
  // @ts-ignore
  const { container } = props
  instance = createApp(App)
  instance.use(Drawer)
  instance.use(Avatar)
  instance.use(router)
  instance.use(DatePicker)
  instance.use(Pagination)
  instance.use(TimePicker)
  instance.use(Menu)
  instance.use(Space)
  instance.use(Select)
  instance.use(Drawer)
  instance.use(Table)
  instance.use(Dropdown)
  instance.use(Button)
  instance.use(ConfigProvider)
  instance.use(Input)
  instance.use(Tabs)
  instance.use(Form)
  instance.use(Card)
  instance.use(Checkbox)
  instance.use(Modal)
  instance.use(Steps)
  instance.use(Spin)
  instance.use(store)
  instance.use(Tag)
  instance.use(Table)
  instance.use(Tooltip)

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