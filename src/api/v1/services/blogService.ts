import { v4 as uuidv4 } from 'uuid'

import { blogQuery } from '../queries'
import { BlogCreateViewDto, BlogGeneralViewDto } from '../dto/blogs'
import { BlogGeneralViewInterface, BlogInterface, BlogQueryDataInterface, BlogQueryInterface } from '../interfaces/modelInterfaces/blog.interface.js'

const createBlog = async (inputData: BlogInterface) => {
  const uniqueId = uuidv4()
  const newBlog = {
    ...inputData,
    blogId: uniqueId,
  }

  const blog = await blogQuery.createBlog(newBlog)

  return new BlogCreateViewDto(blog)
}

const viewBlog = async (blogId: string, queryData:BlogQueryDataInterface) => {
  let blog

  if (blogId) {
    const singleBlog = await blogQuery.getSingleBlogById(blogId)
    blog = new BlogGeneralViewDto(singleBlog)
  } else {
    const blogs = await blogQuery.viewBlogs(queryData)
    blog = blogs.map((singleBlog: BlogGeneralViewInterface) => new BlogGeneralViewDto(singleBlog))
  }

  return blog
}

const viewBlogsByAuthor = async (queryData: BlogQueryDataInterface) => {
  const blogs = await blogQuery.viewBlogsByAuthor(queryData)
  const authorBlogs = blogs.map((singleBlog) => new BlogGeneralViewDto(singleBlog))
  return authorBlogs
}

const editBlog = async (inputData: BlogQueryInterface, blogId: string) => {
  await blogQuery.editBlog(inputData, blogId)
  const updatedBlog = await blogQuery.getSingleBlogById(blogId)

  return new BlogGeneralViewDto(updatedBlog)
}

const deleteBlog = async (blogId: string) => {
  await blogQuery.deleteBlog(blogId)

  return {}
}
export default {
  createBlog,
  viewBlog,
  editBlog,
  deleteBlog,
  viewBlogsByAuthor,
}
