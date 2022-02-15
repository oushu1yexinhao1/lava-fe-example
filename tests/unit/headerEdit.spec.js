import { toggleItemSelection, changeItemSelectOrder } from '../../src/components/HeaderEdit/index.vue'
// eslint-disable-next-line no-duplicate-imports
import HeaderEdit from '../../src/components/HeaderEdit/index.vue'
import { mount } from '@vue/test-utils'

const menuSelectedItemsProps = [
  { 'id': 'oushudb', 'title': 'OushuDB', 'icon': 'topbar_warehouse', 'path': '/test1' },
  { 'id': 'littleboy', 'title': 'LittleBoy', 'icon': 'topbar_littleboy', 'path': '/test2' }
]
const rawMenuProps = [
  {
    'id': 'cloud-data-repo',
    'title': '云数据仓库',
    'icon': '',
    'column': 0,
    'products': [{ 'id': 'oushudb', 'title': 'OushuDB', 'icon': 'topbar_warehouse', 'path': '/test1' }]
  }, {
    'id': 'ai',
    'title': '人工智能',
    'icon': '',
    'column': 0,
    'products': [{ 'id': 'littleboy', 'title': 'LittleBoy', 'icon': 'topbar_littleboy', 'path': '/test2' }]
  }, {
    'id': 'develop-component',
    'title': '开发组件',
    'icon': '',
    'column': 1,
    'products': [
      { 'id': 'lavaflow', 'title': '作业调度LavaFlow', 'icon': 'topbar_dispatch', 'path': '/test3' }, {
        'id': 'wasp',
        'title': '数据同步WASP',
        'icon': 'topbar_synchronization',
        'path': '/test4'
      }, { 'id': 'bi', 'title': 'BI', 'icon': 'topbar_bi', 'path': '/test5' }, {
        'id': 'target-platform',
        'title': '指标平台',
        'icon': 'topbar_index',
        'path': '/test6'
      }, { 'id': 'data-source', 'title': '数据源', 'icon': 'topbar_datesource', 'path': '/test7' }
    ]
  }, {
    'id': 'base-component',
    'title': '基础组件',
    'icon': '',
    'column': 2,
    'products': [
      { 'id': 'yarn', 'title': 'YARN', 'icon': 'topbar_yarn', 'path': '/test8' }, {
        'id': 'zookeeper',
        'title': 'ZooKeeper',
        'icon': 'topbar_zookeeper',
        'path': '/test9'
      }, { 'id': 'spark', 'title': 'Spark', 'icon': 'topbar_spark', 'path': '/test10' }, {
        'id': 'elasticsearch',
        'title': 'ElasticSearch',
        'icon': 'topbar_elasticsearch',
        'path': '/test11'
      }, { 'id': 'hbase', 'title': 'HBase', 'icon': 'topbar_hbase', 'path': '/test12' }, {
        'id': 'hdfs',
        'title': 'HDFS',
        'icon': 'topbar_hdfs',
        'path': '/test12'
      }, { 'id': 'kafka', 'title': 'Kafka', 'icon': 'topbar_kafka', 'path': '/test13' }
    ]
  }, {
    'id': 'statistics-and-monitoring',
    'title': '审计与监控',
    'icon': '',
    'column': 3,
    'products': [
      { 'id': 'statistics', 'title': '审计', 'icon': 'topbar_audit', 'path': '/test14' }, {
        'id': 'monitoring',
        'title': '监控运维',
        'icon': 'topbar_monitor',
        'path': '/test14'
      }
    ]
  }
]

test('changeItemSelectOrder', () => {
  expect(changeItemSelectOrder(menuSelectedItemsProps, menuSelectedItemsProps[1], 0))
    .toEqual([menuSelectedItemsProps[1], ...menuSelectedItemsProps.slice(0, 1).concat(menuSelectedItemsProps.slice(2))])
})

test('to', () => {
  expect(toggleItemSelection(menuSelectedItemsProps, menuSelectedItemsProps[0]))
    .toEqual(menuSelectedItemsProps.slice(1))
})

describe('HeaderEdit组件', () => {
  it('正常显示HeaderEdit ', done => {
    const wrapper = mount(HeaderEdit, {
      propsData: {
        menuSelectedItemsProps,
        rawMenuProps
      }
    })

    setTimeout(() => {
      const allItemSelected = wrapper.findAll('.item-selected')
      expect(allItemSelected.length).toBe(menuSelectedItemsProps.length)

      const columns = wrapper.find('.columns')
      expect(columns.exists()).toBe(true)

      done()
    }, 2000)
  })
})

