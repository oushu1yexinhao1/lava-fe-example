import SubMenu from '../../src/components/SideBar/SubMenu.vue'
import { mount } from '@vue/test-utils'
import antd from 'ant-design-vue'

const menuInfo = {
  'title': '二级菜单例子',
  'icon': '2rd_littleboy',
  'key': '.3',
  'isLocalIcon': true,
  'children': [
    {
      'title': 'Navigation 3',
      'icon': '2rd_littleboy',
      'isGroup': true,
      'children': [
        {
          'title': 'Option 2.1.1',
          'icon': '2rd_littleboy',
          'path': '/test4',
          'key': '.3.0.0',
          'isLocalIcon': true
        }, { 'title': 'Option 2.1.2', 'icon': '2rd_littleboy', 'path': '/test5', 'key': '.3.0.1', 'isLocalIcon': true }
      ],
      'key': '.3.0',
      'isLocalIcon': true
    }
  ]
}

describe('SubMenu组件', () => {
  it('正常显示SubMenu', done => {
    const wrapper = mount(SubMenu, {
      propsData: {
        menuInfo
      },
      // global: { plugins: [antd] }
    })

    setTimeout(() => {
      console.log(wrapper.html())
      // const childrenItem = wrapper.find('.childrenItem')
      // expect(childrenItem.exists()).toBe(true)
      done()
    }, 1000)
  })
})
