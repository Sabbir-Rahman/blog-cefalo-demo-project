export default class CreateAuthorDto {
  constructor(author) {
    this.authorId = author.authorId
    this.name = author.name
    this.email = author.email
  }
}
