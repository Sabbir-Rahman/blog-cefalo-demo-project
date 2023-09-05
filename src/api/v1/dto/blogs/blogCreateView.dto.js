export default class BlogCreateViewDto {
  constructor(blog) {
    this.authorId = blog.authorId
    this.blogId = blog.blogId
    this.title = blog.title
    this.body = blog.body
    this.time = blog.createdAt
  }
}
