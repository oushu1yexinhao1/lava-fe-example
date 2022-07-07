module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      'import',
      { libraryName: 'ant-design-vue', libraryDirectory: 'es', style: true },
    ],
    [
      'import',
      { libraryName: 'ant-design-vue-3', libraryDirectory: 'es', style: true },
      'ant-design-vue-3'
    ],
  ],
}
