/* eslint-disable no-undef */
import { v4 as uuidv4 } from 'uuid'
import { blogQuery } from '../../api/v1/queries'
import { BlogCreateViewDto, BlogGeneralViewDto } from '../../api/v1/dto/blogs'
import blogService from '../../api/v1/services/blog.service'
import { mockDb } from '../__mocks__'

jest.mock('uuid')

describe('blog service test', () => {
  describe('create blog', () => {
    it('Create blog successfull', async () => {
      const blog = {
        title: 'Title',
        body: 'This is body',
        authorId: '68nn890',
        blogId: 'dwqqd221',
      }
      const expectedResponse = new BlogCreateViewDto(blog)

      uuidv4.mockReturnValue('dwqqd221')
      jest.spyOn(blogQuery, 'createBlog').mockResolvedValueOnce(blog)

      const response = await blogService.createBlog(
        { title: blog.title, body: blog.body },
        blog.authorId,
      )
      expect(blogQuery.createBlog).toHaveBeenCalledWith(blog)
      expect(blogQuery.createBlog).toHaveBeenCalledTimes(1)

      expect(response).toStrictEqual(expectedResponse)
    })
  })
  describe('View blog', () => {
    it('View single blog', async () => {
      const blogId = '104303d0-0795-42aa-b7bb-31eab3671c26'
      const blogQueryResult = mockDb.blogsQueryDB[0]
      const expectedResponse = new BlogGeneralViewDto(blogQueryResult)

      jest.spyOn(blogQuery, 'getSingleBlogById').mockResolvedValueOnce(blogQueryResult)

      const response = await blogService.viewBlog(blogId, {})
      expect(blogQuery.getSingleBlogById).toHaveBeenCalledWith(blogId)
      expect(blogQuery.getSingleBlogById).toHaveBeenCalledTimes(1)

      expect(response).toStrictEqual(expectedResponse)
    })
    it('View all blog', async () => {
      const blogQueryResults = mockDb.blogsQueryDB
      const expectedResponse = blogQueryResults.map(
        (singleBlog) => new BlogGeneralViewDto(singleBlog),
      )

      jest.spyOn(blogQuery, 'viewBlogs').mockResolvedValueOnce(blogQueryResults)

      const response = await blogService.viewBlog(null, {})
      expect(blogQuery.viewBlogs).toHaveBeenCalledWith({})
      expect(blogQuery.viewBlogs).toHaveBeenCalledTimes(1)

      expect(response).toStrictEqual(expectedResponse)
    })
  })
  describe('View blogs by author', () => {
    it('View blogs by author', async () => {
      const blogQueryResults = mockDb.blogsQueryDB
      const authorId = '1d6464d8-2151-4147-810a-a3762a60aa3a'
      const expectedResponse = blogQueryResults.map(
        (singleBlog) => new BlogGeneralViewDto(singleBlog),
      )

      jest.spyOn(blogQuery, 'viewBlogsByAuthor').mockResolvedValueOnce(blogQueryResults)

      const response = await blogService.viewBlogsByAuthor(authorId, {})
      expect(blogQuery.viewBlogsByAuthor).toHaveBeenCalledWith(authorId, {})
      expect(blogQuery.viewBlogsByAuthor).toHaveBeenCalledTimes(1)

      expect(response).toStrictEqual(expectedResponse)
    })
  })

  describe('Edit blog', () => {
    it('Edit blog successfull', async () => {
      const blogQueryResult = mockDb.blogsQueryDB[0]
      const blogId = '104303d0-0795-42aa-b7bb-31eab3671c26'
      const inputData = {
        title: 'Hello world',
        body: 'This is a body',
      }
      const expectedResponse = new BlogGeneralViewDto(blogQueryResult)

      jest.spyOn(blogQuery, 'editBlog').mockResolvedValueOnce([1])
      jest.spyOn(blogQuery, 'getSingleBlogById').mockResolvedValueOnce(blogQueryResult)

      const response = await blogService.editBlog(inputData, blogId)

      expect(blogQuery.editBlog).toHaveBeenCalledWith(inputData, blogId)
      expect(blogQuery.editBlog).toHaveBeenCalledTimes(1)

      expect(blogQuery.getSingleBlogById).toHaveBeenCalledWith(blogId)
      expect(blogQuery.getSingleBlogById).toHaveBeenCalledTimes(2)

      expect(response).toStrictEqual(expectedResponse)
    })
  })
  describe('Delete blog', () => {
    it('Delete blog successfull', async () => {
      const blogId = '104303d0-0795-42aa-b7bb-31eab3671c26'

      jest.spyOn(blogQuery, 'deleteBlog').mockResolvedValueOnce([1])

      const response = await blogService.deleteBlog(blogId)

      expect(blogQuery.deleteBlog).toHaveBeenCalledWith(blogId)
      expect(blogQuery.deleteBlog).toHaveBeenCalledTimes(1)

      expect(response).toStrictEqual({})
    })
  })
})
