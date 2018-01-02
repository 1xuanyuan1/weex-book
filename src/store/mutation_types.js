/**
 * source 书源
 */
// 获取书源列表
export const GET_SOURCE_LIST = 'GET_SOURCE_LIST'
// 选定当前书源
export const SET_SOURCE_CURRENT = 'SET_SOURCE_CURRENT'

/**
 * book 书籍内容
 */
// 获取所有章节目录
export const GET_BOOK_CHAPTERS = 'GET_BOOK_CHAPTERS'
// 获取当前章节信息
export const GET_BOOK_ONE_CHAPTER = 'GET_BOOK_ONE_CHAPTER'
// 设置当前书籍
export const SET_BOOK_CURRENT = 'SET_BOOK_CURRENT'
// 设置当前书籍页面信息
export const SET_BOOK_PAGES = 'SET_BOOK_PAGES'
// 上一章
export const FN_BOOK_PREVIOUS_PAGE = 'FN_BOOK_PREVIOUS_PAGE'
// 下一章
export const FN_BOOK_NEXT_PAGE = 'FN_BOOK_NEXT_PAGE'
// 跳转至第几章
export const FN_BOOK_TO_PAGE = 'FN_BOOK_TO_PAGE'
// 添加到书架
export const FN_ADD_BOOKCASE = 'FN_ADD_BOOKCASE'
// 从书架中删除
export const FN_REMOVE_BOOKCASE = 'FN_REMOVE_BOOKCASE'
// 初始化书架 (从缓存中读取)
export const FN_INIT_BOOKCASE = 'FN_INIT_BOOKCASE'
// 初始化用户阅读信息 (从缓存中读取)
export const FN_INIT_PAGES = 'FN_INIT_PAGES'
