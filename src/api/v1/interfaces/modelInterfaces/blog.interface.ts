export interface BlogInterface {
  blogId: string
  title: string
  body: string
  authorId: string
}

export interface BlogUpdateInterface {
    title?: string
    body?: string
  }

export interface BlogQueryInterface {
  authorId?: string
  title?: string
}

export interface BlogInterfaceModel {
  blogId: string
  title: string
  body: string
  authorId: string
  createdAt: string
}

export interface BlogQueryDataInterface {
  page: number
  limit: number
  sortBy: string
  sortOrder: string
  searchText: string
  authorId?: string
  title?: string
}
