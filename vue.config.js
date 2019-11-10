module.exports = {
  lintOnSave: 'warning',
  publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
  // assetsDir: 'static',

  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()

    config.module
      .rule('svg')
      .oneOf('sprite')
      .test(/icons\/.*\.svg$/)
      .use('babel')
      .loader('babel-loader')
      .end()
      .use('svg-sprite')
      .loader('svg-sprite-loader')
      .end()
      .use('svgo')
      .loader('svgo-loader')
      .end()
      .end()

      .oneOf('inline-svg')
      .test(/inline-svg\/.*\.svg$/)
      .use('babel')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .options({
        svgo: {
          plugins: [
            {removeDoctype: true},
            {removeComments: true},
            {cleanupIDs: false},
            {collapseGroups: false},
            {removeEmptyContainers: false}
          ]
        }
      })
      .end()
      .end()

      .oneOf('other')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'img/[name].[hash:8].[ext]'
      })
      .end()
      .end()
  }
}
