export interface UserProps {
  isLogin: boolean
  name?: string
  id?: number
  columnId?: number
}

interface AvatarProps {
  url: string
}

export interface ColumnProps {
  id: number
  title: string
  avatar?: AvatarProps
  description: string
}

export interface ArticleProps {
  id: number
  columnId: number
  title: string
  content: string
  image?: string
  createdAt: string
}

export interface GlobalDataProps {
  user: UserProps
  columnList: ColumnProps[]
  articleList: ArticleProps[]
}
