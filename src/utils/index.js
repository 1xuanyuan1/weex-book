/* eslint-disable no-undef */
const util = weex.requireModule('util') // 自定义的模块 需要移动端实现
const modal = weex.requireModule('modal') // weex自带modal模块

/**
 * 调用自定义模块 弹出提示
 * @param  {String} message 提示内容
 * @return {Void}
 */
const showToast = (message) => {
  modal && modal.toast({ message })
}
/**
 * 写入缓存
 * @param  {String} key
 * @param  {[type]} value
 * @return {Void}
 */
const writeCache = (key, value) => {
  util && util.writeCache(key, JSON.stringify(value))
}
/**
 * 读取缓存
 * @param  {String} key          [description]
 * @param  {[type]} defaultValue 默认值(若该值没有缓存则返回该值)
 * @return {[type]}              返回读到的缓存
 */
const readCache = (key, defaultValue) => {
  return new Promise((resolve, reject) => {
    if (!util) return resolve(defaultValue)
    util.readCache(key, (value) => {
      if (value !== '') {
        return resolve(JSON.parse(value))
      } else {
        return resolve(defaultValue)
      }
    })
  })
}
/**
 * 设置页面标题
 * @param {[type]} title 标题
 */
const setTitle = (title) => {
  util && util.setTitle(title)
}
/**
 * 显示加载框
 */
const showDialog = () => {
  util && util.showDialog()
}
/**
 * 显示加载框
 */
const hiddenDialog = () => {
  util && util.hiddenDialog()
}

export default {
  showToast,
  writeCache,
  readCache,
  setTitle,
  showDialog,
  hiddenDialog
}
