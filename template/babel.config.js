module.exports = {
  presets: [
    ['@vue/app', {
      useBuiltIns: 'entry',
      polyfills: [
        'es.promise',
        'es.symbol'
      ]
    }]
  ]
};
