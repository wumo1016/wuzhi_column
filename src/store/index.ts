import { createStore } from 'vuex'
import { GlobalDataProps } from '@/public/types'
import { getColumnList, getColumnInfo, getArticleList } from '@/api'
import * as types from '@/store/action-types'

const store = createStore<GlobalDataProps>({
  state: {
    loading: false,
    user: {
      isLogin: false
    },
    columnList: [],
    currentColumn: null,
    articleList: []
  },
  getters: {
    getArticleListByCid(state) {
      return (cid: string) => {
        return state.articleList.filter(v => v.column === cid)
      }
    }
  },
  mutations: {
    [types.SET_USER](state) {
      state.user = { ...state.user, isLogin: true, name: 'admin', columnId: 1 }
    },
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
    }
  }
})

export default store
