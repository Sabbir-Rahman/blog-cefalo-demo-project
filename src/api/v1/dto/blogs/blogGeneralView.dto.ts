import { BlogGeneralViewDtoConstructor } from '../../interfaces/modelInterfaces/blog.interface'

export default class BlogGeneralViewDto {
  authorId?: string  
  authorName?: string 
  authorEmail?: string 
  blogId?: string 
  title?: string 
  body?: string | null
  time?: string 
  constructor(blog: BlogGeneralViewDtoConstructor | null) {
    this.authorId = blog?.authorId
    this.authorName = blog?.author?.name
    this.authorEmail = blog?.author?.email
    this.blogId = blog?.blogId
    this.title = blog?.title
    this.body = blog?.body
    this.time = blog?.createdAt
  }
}
