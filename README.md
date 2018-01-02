# weex-book

* weex初探 —— 追书神器
* 1.使用 weex-toolkit 初始化工程
* 2.android代码是用户Android studio 创建再引入weex-sdk

- [x] 1.网络请求 (采用weex自带的stream模块 再将其封装成常规fetch风格的方式)
- [x] 2.Vue Router (使用vue单页面模式 用前端路由做页面跳转 将大部分交互交于前端来实现)
- [x] 3.Vuex (状态管理。特别是移动端没有前端页面刷新操作 可以很方便的做全局变量以及状态管理)
- [ ] 4.开发模式模式 (接口跨域问题)
- [ ] 5.界面问题 ()
## getting start

```bash
npm install
```

## file structure

* `src/*`: all source code
* `app.js`: entrance of the Weex page
* `build/*`: some build scripts
* `dist/*`: where places generated code
* `assets/*`: some assets for Web preview
* `index.html`: a page with Web preview and qrcode of Weex js bundle
* `weex.html`: Web render
* `.babelrc`: babel config (preset-2015 by default)
* `.eslintrc`: eslint config (standard by default)

## npm scripts

```bash
# build both two js bundles for Weex and Web
npm run build

# build the two js bundles and watch file changes
npm run dev

# start a Web server at 8080 port
npm run serve

# start weex-devtool for debugging with native
npm run debug
```

## notes

You can config more babel, ESLint and PostCSS plugins in `webpack.config.js`.
