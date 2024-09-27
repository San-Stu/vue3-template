## 使用

```bash
// 保证 vue cli 版本在 4.5.0 以上
vue --version

// 创建项目
vue create --preset San-Stu/vue3-joyrun <project-name>
```

## 介绍

模板基础基于vue脚手架搭建，具体步骤选择如下

- Please pick a preset: Manually select features
Check the features needed for your project: Choose Vue version, Babel, TS, Router, Linter
- Choose a version of Vue.js that you want to start the project with 3.x (Preview)
- Use class-style component syntax? No
- Use Babel alongside TypeScript (required for modern mode, auto-detected polyfills, transpiling JSX)? Yes
- Use history mode for router? (Requires proper server setup for index fallback in production) Yes
- Pick a linter / formatter config: Standard
- Pick additional lint features: Lint on save
- Where do you prefer placing config for Babel, ESLint, etc.? In dedicated config files
- Save this as a preset for future projects? No



## 与之前的模板有何不同

1.支持Vue3 + Typescript，希望团队的同学使用该模板时请无脑使用Composition API + Typescript的方式撸码，否则你使用该模板的意义不大。

2.增加build:cdn命令，在打包完成后将资源上传又拍云（只能上传js、css下的文件），在index.html也会注入相对应的依赖。如需使用该功能请联系我，在我提供('bucket', 'operator', 'password')之后才能使用。

3.list选择干掉了Eslint的可选，改为默认使用，并且规则使用Standard；UI库不再提供Mint-ui和Vux的选择，改为默认使用Vant；其他选项则保留。

4.使用Vant替换Mint-ui，因为Vant支持Vue3和Typescript。Vant使用方式和Mint-ui类似，也是按需引入，具体可以查看[Vant文档](https://vant-contrib.gitee.io/vant/v3/#/zh-CN)。

5.之前vue2模板打包会把所有的js和css打包在一个build.*.js下，该模板打包会区别js和css，并且库、插件的代码和业务的代码会分别打包为chunk-vendors.*.js和app.*.js，这样的好处是比如你只修改业务代码的情况下，用户不需要重新加载一个1M左右的build.*.js，而只需要重新加载个通常只有几十KB的app.*.js就好了。

6.干掉了main-1.1.3.min.js和zhuge.js的script标签引入，增加了main-2.0.min.js的script标签引入。

7.之前打包index.html的模板是基于template下的index.html，现在的模板是基于public下的index.html，并且修改title也是直接在该html下修改而不需要修改webpack里的title。

8.公共的模块改为放在common下。

9.share.js改为最新版插件的写法，之前的写法已不支持。

10.增加了types文件夹，里面放了一堆TS的描述文件，同学们有新增描述文件需求的话希望统一放到该文件夹下

11.增加了hooks文件夹，里面有个常用的startrun hook，各位觉得还有哪些可以抽离成hook的都可以跟我说。

12.接口代理到了测试环境而非本地了，并且路由拦截器里增加了默认的参数login_uid方便调试，需要的可以打开注释。


## 注意的问题
1.如果你的IDEA装了Vetur，那么你可能会遇到明明有TS的描述文件却还是会有变量标红报"Cannot find name 'xxx'"，别慌，这只是Vetur的报错，而且不影响开发，可以等Vetur修复。如果你一定要解决这个问题的话，可以把你的项目文件夹设置为根目录就好了，参考[这个](https://segmentfault.com/q/1010000022146361)。

2.如果你要用build:cdn命令的话，那么使用本地图片不要用background-image，请使用img标签，不然会造成图片路径错误。
