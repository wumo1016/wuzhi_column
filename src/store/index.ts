import { createStore } from 'vuex'
import { GlobalDataProps } from '@/public/types'
import {
  getColumnList,
  getColumnInfo,
  getArticleList,
  login,
  getUserInfo,
  createArticle,
  getArticleInfo,
  updateArtical
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
      const res = await getColumnList()
      commit(types.SET_COLUMN_LIST, res.data)
    },
    async [types.SET_CURRENT_COLUMN]({ commit }, id: string) {
      commit(types.SET_CURRENT_COLUMN, null)
      const res = await getColumnInfo(id)
      commit(types.SET_CURRENT_COLUMN, res.data)
    },
    async [types.SET_ARTICLE_LIST]({ commit }, id: string) {
      const res = await getArticleList(id)
      commit(types.SET_ARTICLE_LIST, res.data)
    },
    async [types.SET_TOKEN]({ commit }, payload) {
      const res = await login(payload)
      commit(types.SET_TOKEN, res.data)
    },
    async [types.SET_USER]({ commit }) {
      const res = await getUserInfo()
      commit(types.SET_USER, res.data)
    },
    async [types.CREATE_ARTICLE](store, payload) {
      await createArticle(payload)
    },
    async [types.SET_CURRENT_ARTICLE]({ commit }, payload) {
      commit(types.SET_CURRENT_ARTICLE, null)
      const res = await getArticleInfo(payload)
      commit(types.SET_CURRENT_ARTICLE, res.data)
    },
    async [types.PATCH_ARTICLE](store, payload) {
      await updateArtical(payload)
    }
  }
})

export default store
