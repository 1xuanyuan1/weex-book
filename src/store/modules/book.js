import api from 'service'
import * as types from '../mutation_types'
import util from 'utils'
const state = {
  bookcase: {}, // 我的书架
  currentBook: '', // 当前书籍
  chapters: {}, // 所有章节
  currentBookChapter: {}, // 当前书籍下正在读的章节
  pages: {} // 页数 (为了翻页)
}
const mutations = {
  [types.SET_BOOK_CURRENT] (state, bookId) {
    state.currentBook = bookId
  },
  [types.GET_BOOK_CHAPTERS] (state, list) {
    state.chapters[state.currentBook] = list
    // 若还没看过这本书则 初始化该书第一章信息
    if (Object.keys(state.pages).indexOf(state.currentBook) === -1) {
      state.pages[state.currentBook] = {
        hasPrevious: false, // 是否有上一页
        hasNext: list.length > 0, // 是否有下一页
        current: 0,
        size: list.length
      }
      state.currentBookChapter[state.currentBook] = list[0]
    } else {
      // 若看过该书 则获取到当前页的信息
      state.currentBookChapter[state.currentBook] = list[state.pages[state.currentBook].current]
    }
  },
  [types.FN_BOOK_NEXT_PAGE] (state) {
    let bookId = state.currentBook
    let page = state.pages[bookId]
    if (page && page.hasNext) {
      state.currentBookChapter[bookId] = state.chapters[bookId][page.current + 1]
      state.pages[bookId] = Object.assign(state.pages[bookId], {
        hasPrevious: true, // 是否有上一页
        hasNext: page.size > page.current + 1, // 是否有下一页
        current: page.current + 1
      })
      util.writeCache('pages', state.pages)
    }
  },
  [types.FN_BOOK_PREVIOUS_PAGE] (state) {
    let bookId = state.currentBook
    let page = state.pages[bookId]
    if (page && page.hasPrevious) {
      state.currentBookChapter[bookId] = state.chapters[bookId][page.current - 1]
      state.pages[bookId] = Object.assign(state.pages[bookId], {
        hasPrevious: page.current - 1 > 0, // 是否有上一页
        hasNext: true, // 是否有下一页
        current: page.current - 1
      })
      util.writeCache('pages', state.pages)
    }
  },
  [types.FN_BOOK_TO_PAGE] (state, num) {
    let bookId = state.currentBook
    state.pages[bookId] = Object.assign(state.pages[bookId], {
      hasPrevious: num > 0, // 是否有上一页
      hasNext: true, // 是否有下一页
      current: num
    })
    state.currentBookChapter[bookId] = state.chapters[bookId][num]
    util.writeCache('pages', state.pages)
  },
  [types.FN_ADD_BOOKCASE] (state, book) {
    state.bookcase[book._id] = book
    util.showToast('放入书架成功!')
    util.writeCache('bookcase', state.bookcase)
  },
  [types.FN_REMOVE_BOOKCASE] (state, bookId) {
    delete state.bookcase[bookId]
    util.showToast('移除书架成功!')
    util.writeCache('bookcase', state.bookcase)
  },
  [types.FN_INIT_BOOKCASE] (state, bookcase) {
    state.bookcase = bookcase
  },
  [types.FN_INIT_PAGES] (state, pages) {
    state.pages = pages
  }
}

const actions = {
  setBookCurrent ({ commit }, bookId) {
    commit(types.SET_BOOK_CURRENT, bookId)
  },
  getBookChapters ({ commit }, sourceId) {
    return api.get(`toc/${sourceId}?view=chapters&channel=mweb`).then((data) => {
      commit(types.GET_BOOK_CHAPTERS, data.chapters)
    })
  },
  initBookcase ({ commit }, bookcase) {
    commit(types.FN_INIT_BOOKCASE, bookcase)
  },
  initPages ({ commit }, pages) {
    commit(types.FN_INIT_PAGES, pages)
  },
  addBookcase ({ commit }, book) {
    commit(types.FN_ADD_BOOKCASE, book)
  },
  removeBookcase ({ commit }, bookId) {
    commit(types.FN_REMOVE_BOOKCASE, bookId)
  },
  fnToPage ({ commit }, num) {
    commit(types.FN_BOOK_TO_PAGE, num)
  },
  fnNextPage ({ commit }) {
    commit(types.FN_BOOK_NEXT_PAGE)
  },
  fnPreviousPage ({ commit }) {
    commit(types.FN_BOOK_PREVIOUS_PAGE)
  }
}

const getters = {
  bookcase: state => state.bookcase,
  current: state => state.currentBook,
  chapters: state => state.chapters,
  pages: state => state.pages,
  currentBookChapter: state => state.currentBookChapter
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
