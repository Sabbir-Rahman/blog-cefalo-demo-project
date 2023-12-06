import { BlogInterface } from "../../interfaces/modelInterfaces/blog.interface"

export default class BlogCreateViewDto {
  authorId: string
  blogId: string
  title: string
  body: string | null
  time?: string
  constructor(blog: BlogInterface) {
    this.authorId = blog.authorId
    this.blogId = blog.blogId
    this.title = blog.title
    this.body = blog.body
    this.time = blog.createdAt
  }
}
