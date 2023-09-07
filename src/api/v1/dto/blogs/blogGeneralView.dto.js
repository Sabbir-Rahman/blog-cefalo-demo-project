export default class BlogGeneralViewDto {
  constructor(blog) {
    this.authorId = blog?.authorId
    this.authorName = blog?.author.name
    this.authorEmail = blog?.author.email
    this.blogId = blog?.blogId
    this.title = blog?.title
    this.body = blog?.body
    this.time = blog?.createdAt
  }
}
