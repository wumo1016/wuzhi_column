import { createStore } from 'vuex'
import { GlobalDataProps } from '@/public/types'
import { getColumns } from '@/api'
import * as types from '@/store/action-types'

export default createStore<GlobalDataProps>({
  state: {
    columnList: [],
    articleList: [],
    user: {
      isLogin: false
    }
  },
  getters: {
    biggerColumnLen(state) {
      return state.columnList.filter(v => v.id > 2).length
    },
    getColumnById(state) {
      return (id: number) => {
        return state.columnList.find(v => v.id === id)
      }
    },
    getPostByCid(state) {
      return (cid: number) => {
        return state.articleList.filter(v => v.columnId === cid)
      }
    }
  },
  mutations: {
    [types.SET_COLUMN_LIST](state, data) {
      state.columnList = data.list
    },
    [types.SET_USER](state) {
      state.user = { ...state.user, isLogin: true, name: 'admin', columnId: 1 }
    },
    createPost(state, data) {
      state.posts.push(data)
    }
  },
  actions: {
    async [types.SET_COLUMN_LIST]({ commit }) {
      const data = await getColumns()
      commit(types.SET_COLUMN_LIST, data)
    }
  }
})
