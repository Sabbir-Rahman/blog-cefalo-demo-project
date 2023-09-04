export default class AuthorGeneralViewDto {
  constructor(author) {
    this.authorId = author.authorId
    this.name = author.name
    this.email = author.email
  }
}
