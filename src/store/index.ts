import { createStore } from 'vuex'
import { GlobalDataProps } from '@/public/types'
import {
  getColumnList,
  getColumnInfo,
  getArticleList,
  login,
  getUserInfo,
  createArticle,
  getArticleInfo
} from '@/api'
import * as types from '@/store/action-types'
import {
  setLocalUserInfo,
  getLocalUserInfo,
  setLocalToken,
  getLocalToken
} from '@/public/storage'

const store = createStore<GlobalDataProps>({
  state: {
    loading: false,
    token: getLocalToken() || '',
    user: getLocalUserInfo() || {
      isLogin: false
    },
    columnList: [],
    currentColumn: null,
    articleList: [],
    currentArticle: null
  },
  getters: {
    getArticleListByCid(state) {
      return (cid: string) => {
        return state.articleList.filter(v => v.column === cid)
      }
    }
  },
  mutations: {
    [types.SET_COLUMN_LIST](state, data) {
      state.columnList = data.list
    },
    [types.SET_CURRENT_COLUMN](state, data) {
      state.currentColumn = data
    },
    [types.SET_ARTICLE_LIST](state, data) {
      state.articleList = data.list
    },
    [types.SET_LOADING](state, data) {
      state.loading = data
    },
    [types.SET_TOKEN](state, data) {
      setLocalToken(data.token)
      state.token = data.token
    },
    [types.SET_USER](state, data) {
      const userInfo = { ...data, isLogin: true }
      setLocalUserInfo(userInfo)
      state.user = userInfo
    },
    [types.SET_CURRENT_ARTICLE](state, data) {
      state.currentArticle = data
    }
  },

  actions: {
    async [types.SET_COLUMN_LIST]({ commit }) {
      const data = await getColumnList()
      commit(types.SET_COLUMN_LIST, data)
    },
    async [types.SET_CURRENT_COLUMN]({ commit }, id: string) {
      commit(types.SET_CURRENT_COLUMN, null)
      const data = await getColumnInfo(id)
      commit(types.SET_CURRENT_COLUMN, data)
    },
    async [types.SET_ARTICLE_LIST]({ commit }, id: string) {
      const data = await getArticleList(id)
      commit(types.SET_ARTICLE_LIST, data)
    },
    async [types.SET_TOKEN]({ commit }, payload) {
      const data = await login(payload)
      commit(types.SET_TOKEN, data)
    },
    async [types.SET_USER]({ commit }) {
      const data = await getUserInfo()
      commit(types.SET_USER, data)
    },
    async [types.CREATE_ARTICLE](store, payload) {
      await createArticle(payload)
    },
    async [types.SET_CURRENT_ARTICLE]({ commit }, payload) {
      commit(types.SET_CURRENT_ARTICLE, null)
      const data = await getArticleInfo(payload)
      commit(types.SET_CURRENT_ARTICLE, data)
    }
  }
})

export default store
