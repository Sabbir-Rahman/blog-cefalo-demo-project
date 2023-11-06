import { AuthorGeneralViewDtoConstructor } from "../../interfaces/modelInterfaces/author.interface"

export default class AuthorGeneralViewDto {
  authorId?: string
  name?: string
  email?: string
  constructor(author: AuthorGeneralViewDtoConstructor| null) {
    this.authorId = author?.authorId
    this.name = author?.name
    this.email = author?.email
  }
}
