const deleteFilesArr = [
  'src/pages/page2.vue',
  'src/pages/Home.vue',
  'src/components/HelloWorld.vue',
  'public/favicon.ico',
  'src/assets/logo.png',
  'src/main.js',
  'package-lock.json'
]

module.exports = (api, options, rootOptions) => {
  // 修改package.json
  const package = {
    'name': options.name,
    'description': options.description,
    'version': '1.0.0',
    'author': options.author,
    'license': options.license,
    'private': true,
    'scripts': {
      'dev': 'vue-cli-service serve',
      'build:cdn': 'cross-env IS_CDN=true vue-cli-service build && node build_cdn.js'
    },
    'dependencies': {
      'axios': '^0.21.1',
      "vant": "3.4.9",
      'vue': '3.2.11',
      'vue-router': '^4.0.0-0'
    },
    'devDependencies': {
      '@types/jquery': '^3.5.5',
      "@typescript-eslint/eslint-plugin": "^4.18.0",
      "@typescript-eslint/parser": "^4.18.0",
      "@vue/cli-plugin-babel": "~4.5.0",
      '@vue/cli-plugin-eslint': '~4.5.0',
      '@vue/cli-plugin-router': '~4.5.0',
      '@vue/cli-plugin-typescript': '~4.5.0',
      '@vue/cli-service': '~4.5.0',
      '@vue/compiler-sfc': '^3.0.0',
      '@vue/eslint-config-standard': '^5.1.2',
      "@vue/eslint-config-typescript": "^7.0.0",
      'babel-eslint': '^10.1.0',
      "cross-env": "^7.0.3",
      'eslint': '^6.7.2',
      'eslint-plugin-import': '^2.20.2',
      'eslint-plugin-node': '^11.1.0',
      'eslint-plugin-promise': '^4.2.1',
      'eslint-plugin-standard': '^4.0.0',
      'eslint-plugin-vue': '^7.0.0-0',
      "upyun": "^3.4.4",
      'ip': '^1.1.5',
      "ts-import-plugin": "^1.6.7",
      "typescript": "~4.1.5"
    }
  }
  if (options.cssPerprocessor === 'less') {
    package.devDependencies = {
      ...package.devDependencies,
      'less': '^3.0.4',
      'less-loader': '^5.0.0',
    }
  }
  if (options.cssPerprocessor === 'sass') {
    package.devDependencies = {
      ...package.devDependencies,
      'node-sass': '^4.8.3',
      'sass': '^1.1.1',
      'sass-loader': '^6.0.7',
    }
  }
  api.extendPackage(package)
  // 复制并用 ejs 渲染 `./template` 内所有的文件
  api.render('./template')
  // 删除文件
  api.render(files => {
    deleteFilesArr.forEach(file => {
      delete files[file]
    })
  })
  // 配置文件
  api.render({
    './.eslintrc.js': './template/_eslintrc.js',
    './.eslintignore': './template/_eslintignore',
    './.editorconfig': './template/_editorconfig',
    './.gitignore': './template/_gitignore'
  });
}