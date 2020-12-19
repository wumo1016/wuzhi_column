export interface UserProps {
  isLogin: boolean
  nickName?: string
  _id?: string
  column?: number
  email?: string
  description?: string
  avatar?: ImageProps
}

export interface ImageProps {
  url: string
  _id?: string
  dealUrl?: string
}

export interface ColumnProps {
  _id: string
  title: string
  avatar?: ImageProps
  description: string
}

export interface ArticleProps {
  _id?: string
  column: string
  title: string
  excerpt?: string
  content: string
  image?: ImageProps
  author?: string | UserProps
  createdAt?: string
  isHTML?: boolean
}

export interface GlobalDataProps {
  loading: boolean
  user: UserProps
  token: string
  columnList: ColumnProps[]
  currentColumn: ColumnProps | null
  articleList: ArticleProps[]
  currentArticle: ArticleProps | null
}

export interface MessageProps {
  type?: 'default' | 'success' | 'error'
  message?: string
  timeout?: number
}
