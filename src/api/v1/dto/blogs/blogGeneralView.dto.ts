import { BlogGeneralViewInterface } from '../../interfaces/modelInterfaces/blog.interface'

export default class BlogGeneralViewDto {
  authorId?: string  
  authorName?: string 
  authorEmail?: string 
  blogId?: string 
  title?: string 
  body?: string | null
  time?: string 
  constructor(blog: BlogGeneralViewInterface | null) {
    this.authorId = blog?.authorId
    this.authorName = blog?.Author?.name
    this.authorEmail = blog?.Author?.email
    this.blogId = blog?.blogId
    this.title = blog?.title
    this.body = blog?.body
    this.time = blog?.createdAt
  }
}
