import { getSvg, getSvgSource } from '../../src/components/Icon.vue'
// eslint-disable-next-line no-duplicate-imports
import Icon from '../../src/components/Icon.vue'
import { mount } from '@vue/test-utils'

test('getSvg', () => {
  expect(getSvg('topbar_warehouse_click', 'custom-class')).toBe(
    '<svg class="icon icon-topbar_warehouse_click custom-class"><use xlink:href="#topbar_warehouse_click" /></svg>'
  )
})
test('getSvg with namespace', () => {
  expect(getSvg('topbar_warehouse_click', 'custom-class', 'my-namespace')).toBe(
    '<svg class="icon icon-topbar_warehouse_click custom-class"><use xlink:href="#my-namespace-topbar_warehouse_click" /></svg>'
  )
})

test('getSvgSource', async() => {
  expect(
    await getSvgSource(
      'https://almon-public.oss-cn-beijing.aliyuncs.com/svg-icons.svg'
    )
  ).toMatch('<svg class="icon icon-source" style="display: none;">')
})

test('getSvgSource', async() => {
  expect(
    await getSvgSource(
      'https://almon-public.oss-cn-beijing.aliyuncs.com/svg-icons.svg',
      'my-namespace'
    )
  ).toMatch('id="my-namespace-')
})

describe('Icon组件', () => {
  it('正常显示svg', done => {
    const wrapper = mount(Icon, {
      propsData: {
        type: 'svg',
        src: 'https://almon-public.oss-cn-beijing.aliyuncs.com/svg-icons.svg',
        name: 'delete'
      }
    })
    setTimeout(() => {
      const use = wrapper.find('use')
      expect(use.exists()).toBe(true)
      done()
    }, 2000)
  })
})
