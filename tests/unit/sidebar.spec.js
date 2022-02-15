import { isComponentIcon, getIconComponentName, formatRawMenu } from '../../src/components/SideBar/index.vue'
// eslint-disable-next-line no-duplicate-imports
// import SideBar from '../../src/components/SideBar/index.vue'

const rawMenu = {
  'id': 'lavaflow',
  'title': '作业调度',
  'icon': 'Icon/2rd_dispatch',
  'children': [
    {
      'title': '集群',
      'icon': 'Icon/2rd_dispatch_group',
      'path': '/test1'
    }, {
      'title': '作业空间',
      'icon': 'Icon/2rd_synchronization_task',
      'path': '/test2'
    }, {
      'title': '作业监控',
      'icon': 'Icon/2rd_synchronization_deploy',
      'path': '/test3'
    }, {
      'title': '二级菜单例子',
      'icon': 'Icon/2rd_littleboy',
      'children': [
        {
          'title': 'Navigation 3',
          'icon': 'Icon/2rd_littleboy',
          'isGroup': true,
          'children': [
            {
              'title': 'Option 2.1.1',
              'icon': 'Icon/2rd_littleboy',
              'path': '/test4'
            }, {
              'title': 'Option 2.1.2',
              'icon': 'Icon/2rd_littleboy',
              'path': '/test5'
            }
          ]
        }
      ]
    }
  ]
}

const formatedRawMenu = {
  'id': 'lavaflow',
  'title': '作业调度',
  'icon': '2rd_dispatch',
  'key': '',
  'isLocalIcon': true,
  'children': [
    {
      'title': '集群',
      'icon': '2rd_dispatch_group',
      'path': '/test1',
      'key': '.0',
      'isLocalIcon': true
    }, {
      'title': '作业空间',
      'icon': '2rd_synchronization_task',
      'path': '/test2',
      'key': '.1',
      'isLocalIcon': true
    }, {
      'title': '作业监控',
      'icon': '2rd_synchronization_deploy',
      'path': '/test3',
      'key': '.2',
      'isLocalIcon': true
    }, {
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
            }, {
              'title': 'Option 2.1.2',
              'icon': '2rd_littleboy',
              'path': '/test5',
              'key': '.3.0.1',
              'isLocalIcon': true
            }
          ],
          'key': '.3.0',
          'isLocalIcon': true
        }
      ]
    }
  ],
}

test('isComponentIcon("Icon/) should return true"', () => {
  expect(isComponentIcon('Icon/'))
    .toBe(true)
})

test('isComponentIcon("icon/") should return false', () => {
  expect(isComponentIcon('icon/'))
    .toBe(false)
})

test('getInconComonentName("Icon/smile") should return "smile"', () => {
  expect(getIconComponentName('Icon/smile'))
    .toEqual('smile')
})

test('formatRawMenu', () => {
  expect(formatRawMenu(rawMenu))
    .toEqual(formatedRawMenu)
})
