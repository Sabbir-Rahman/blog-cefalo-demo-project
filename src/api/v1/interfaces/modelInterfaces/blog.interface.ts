import { AuthorInstance } from "../../models/authorModel"
import { BlogInstance } from "../../models/blogModel"

export interface BlogInterface {
  blogId: string
  title: string
  body: string | null
  authorId: string
  createdAt?: string
}

export interface BlogCreateInterface {
    blogId?: string
    title?: string
    body?: string
    authorId?: string
    createdAt?: string
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
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: string
  searchText?: string
  authorId?: string
  title?: string
}

export interface BlogGeneralViewDtoConstructor {
  authorId: string
  author?:{
    name: string
  email: string
  }
  blogId: string
  title: string
  body: string | null
  createdAt?: string
}


export interface BlogsWithAuthor extends BlogInstance {
    author: AuthorInstance | null
}



