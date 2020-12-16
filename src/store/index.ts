import { createStore } from 'vuex'
import { testData, testPosts, ColumnProps, TestPost } from './testData'
export interface UserProps {
  isLogin: boolean
  name?: string
  id?: number
  columnId?: number
}
export interface GlobalDataProps {
  columns: ColumnProps[]
  posts: TestPost[]
  user: UserProps
}
export default createStore<GlobalDataProps>({
  state: {
    columns: testData,
    posts: testPosts,
    user: {
      isLogin: false
    }
  },
  getters: {
    biggerColumnLen(state) {
      return state.columns.filter(v => v.id > 2).length
    },
    getColumnById(state) {
      return (id: number) => {
        return state.columns.find(v => v.id === id)
      }
    },
    getPostByCid(state) {
      return (cid: number) => {
        return state.posts.filter(v => v.columnId === cid)
      }
    }
  },
  mutations: {
    login(state) {
      state.user = { ...state.user, isLogin: true, name: 'admin', columnId: 1 }
    },
    createPost(state, data) {
      state.posts.push(data)
    }
  },
  actions: {}
})
