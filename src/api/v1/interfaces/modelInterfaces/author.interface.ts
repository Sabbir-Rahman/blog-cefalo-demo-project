export interface AuthorInterface {
  authorId: string
  name: string
  email: string
  password: string
}

export interface AuthorGeneralViewDtoConstructor {
  authorId?: string
  name?: string
  email?: string
}
