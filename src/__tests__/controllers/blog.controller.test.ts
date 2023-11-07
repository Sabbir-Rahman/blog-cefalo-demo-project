import { Request, Response } from 'express'
import { blogController } from '../../api/v1/controller'
import blogService from '../../api/v1/services/blogService'
import CustomResponse from '../../api/v1/utils/customResponse'
import { mockDb } from '../__mocks__'

describe('Blog controller test', () => {
  describe('Create blog test', () => {
    it('Create blog successfull', async () => {
      const req = {
        body: {
          title: 'Hello world',
          body: 'This is a trap',
        },
      } as unknown as Request
      const res = {
        locals: {
          user: {
            userId: '1ea6c1e5-5649-4591-a813-441d0c840a1b',
          },
        },
      } as unknown as Response

      const expectedResponse = {
        isSuccess: true,
        statusCode: 201,
        message: 'Author created',
        developerMessage: '',
        isReadOnly: false,
        data: mockDb.blogsDB[0],
      }
      const next = jest.fn()
      const authorId = '1ea6c1e5-5649-4591-a813-441d0c840a1b'

      jest.spyOn(blogService, 'createBlog').mockResolvedValueOnce(expectedResponse.data as never)
      jest
        .spyOn(CustomResponse.prototype, 'sendResponse')
        .mockResolvedValueOnce(expectedResponse as never)

      const response = await blogController.createBlog(req, res, next)

      expect(blogService.createBlog).toHaveBeenCalledWith({ ...req.body, authorId })

      expect(response).toBe(expectedResponse)
    })
  })

  describe('View Blog Test', () => {
    it('View all blogs', async () => {
      const req = {
        params: {
          id: {},
        },
        query: {},
      } as unknown as Request
      const res = {} as Response
      const expectedResponse = {
        message: '',
        developerMessage: 'Blog View Successfull',
        data: mockDb.blogsWithAuthorDB,
      }
      const next = jest.fn()

      jest.spyOn(blogService, 'viewBlog').mockResolvedValueOnce(expectedResponse.data as never)
      jest
        .spyOn(CustomResponse.prototype, 'sendResponse')
        .mockResolvedValueOnce(expectedResponse as never)

      const response = await blogController.viewBlog(req, res, next)
      expect(blogService.viewBlog).toHaveBeenCalledWith(req.params.id, req.query)
      expect(blogService.viewBlog).toHaveBeenCalledTimes(1)

      expect(response).toBe(expectedResponse)
    })

    it('View single blog', async () => {
      const req = {
        params: {
          id: '104303d0-0795-42aa-b7bb-31eab3671c26',
        },
        query: {},
      } as unknown as Request
      const res = {} as Response
      const expectedResponse = {
        message: '',
        developerMessage: 'Blog View Successfull',
        data: mockDb.blogsWithAuthorDB[0],
      }
      const next = jest.fn()

      jest.spyOn(blogService, 'viewBlog').mockResolvedValueOnce(expectedResponse.data)
      jest
        .spyOn(CustomResponse.prototype, 'sendResponse')
        .mockResolvedValueOnce(expectedResponse as never)

      const response = await blogController.viewBlog(req, res, next)
      expect(blogService.viewBlog).toHaveBeenCalledWith(req.params.id, req.query)
      // 2 because same function is called in view all blogs
      expect(blogService.viewBlog).toHaveBeenCalledTimes(1)

      expect(response).toBe(expectedResponse)
    })
  })

  describe('Edit blog test', () => {
    it('Edit blog successfull', async () => {
      const req = {
        body: {
          title: 'Hello world Edited',
          body: 'This is a trap Edited',
        },
        params: {
          id: '104303d0-0795-42aa-b7bb-31eab3671c26',
        },
      } as unknown as Request
      const res = {} as Response

      const expectedResponse = {
        isSuccess: true,
        statusCode: 201,
        message: 'Author created',
        developerMessage: '',
        isReadOnly: false,
        data: {
          authorId: '1d6464d8-2151-4147-810a-a3762a60aa3a',
          authorName: 'sabbir',
          authorEmail: 'sabbir2@gmail.com',
          blogId: '104303d0-0795-42aa-b7bb-31eab3671c26',
          title: 'Hello world Edited',
          body: 'This is a trap Edited',
          time: '2023-09-05T03:26:42.000Z',
        },
      }
      const next = jest.fn()

      jest.spyOn(blogService, 'editBlog').mockResolvedValueOnce(expectedResponse.data)
      jest
        .spyOn(CustomResponse.prototype, 'sendResponse')
        .mockResolvedValueOnce(expectedResponse as never)

      const response = await blogController.editBlog(req, res, next)

      expect(blogService.editBlog).toHaveBeenCalledWith(req.body, req.params.id)
      expect(blogService.editBlog).toHaveBeenCalledTimes(1)

      expect(response).toBe(expectedResponse)
    })
  })
  describe('Delete blog test', () => {
    it('Delete Blog Successfull', async () => {
      const req = {
        body: {},
        params: {
          id: '104303d0-0795-42aa-b7bb-31eab3671c26',
        },
      } as unknown as Request
      const res = {} as Response
      const next = jest.fn()
      const expectedResponse = {
        statusCode: 204,
        message: 'Delete Successfull',
        developerMessage: 'Delete Successfull',
        data: {},
      }
      jest.spyOn(blogService, 'deleteBlog').mockResolvedValueOnce({})
      jest
        .spyOn(CustomResponse.prototype, 'sendResponse')
        .mockResolvedValueOnce(expectedResponse as never)

      const response = await blogController.deleteBlog(req, res, next)

      expect(blogService.deleteBlog).toHaveBeenCalledWith(req.params.id)
      expect(blogService.deleteBlog).toHaveBeenCalledTimes(1)

      expect(response).toBe(expectedResponse)
    })
  })
})
