export interface UserProps {
  isLogin: boolean
  nickName?: string
  id?: number
  columnId?: number
  email?: string
}

interface ImageProps {
  url: string
  dealUrl?: string
}

export interface ColumnProps {
  _id: string
  title: string
  avatar?: ImageProps
  description: string
}

export interface ArticleProps {
  _id: string
  column: string
  title: string
  excerpt?: string
  content?: string
  image?: ImageProps
  createdAt: string
}

export interface GlobalDataProps {
  loading: boolean
  user: UserProps
  token: string
  columnList: ColumnProps[]
  currentColumn: ColumnProps | null
  articleList: ArticleProps[]
}
