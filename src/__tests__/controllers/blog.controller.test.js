/* eslint-disable import/extensions */
import { blogController } from '../../api/v1/controller/index.js'
import { BadRequestError } from '../../api/v1/errors/index.js'
import blogService from '../../api/v1/services/blog.service.js'
import CustomResponse from '../../api/v1/utils/customResponse.js'
import { mockDb } from '../__mocks__/index.js'

/* eslint-disable no-undef */
describe('Blog controller test', () => {
  describe('Create blog test', () => {
    it('Blog Validation Error', async () => {
      const req = { body: {} }
      const res = {}
      const next = jest.fn()

      await blogController.createBlog(req, res, next)
      expect(next).toHaveBeenCalledWith(new BadRequestError('Validation Error', [{}]))
    })

    it('Create blog successfull', async () => {
      const req = {
        body: {
          title: 'Hello world',
          body: 'This is a trap',
        },
        accessToken: {
          userId: '1ea6c1e5-5649-4591-a813-441d0c840a1b',
        },
      }
      const res = {}

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

      jest.spyOn(blogService, 'createBlog').mockResolvedValueOnce(expectedResponse.data)
      jest.spyOn(CustomResponse.prototype, 'sendResponse').mockResolvedValueOnce(expectedResponse)

      const response = await blogController.createBlog(req, res, next)

      expect(blogService.createBlog).toHaveBeenCalledWith(req.body, authorId)

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
      }
      const res = {}
      const expectedResponse = {
        message: '',
        developerMessage: 'Blog View Successfull',
        data: mockDb.blogsWithAuthorDB,
      }
      const next = jest.fn()

      jest.spyOn(blogService, 'viewBlog').mockResolvedValueOnce(expectedResponse.data)
      jest.spyOn(CustomResponse.prototype, 'sendResponse').mockResolvedValueOnce(expectedResponse)

      const response = await blogController.viewBlog(req, res, next)
      expect(blogService.viewBlog).toHaveBeenCalledWith(req.params.id, req.query)

      expect(response).toBe(expectedResponse)
    })

    it('View single blog', async () => {
      const req = {
        params: {
          id: '104303d0-0795-42aa-b7bb-31eab3671c26',
        },
        query: {},
      }
      const res = {}
      const expectedResponse = {
        message: '',
        developerMessage: 'Blog View Successfull',
        data: mockDb.blogsWithAuthorDB[0],
      }
      const next = jest.fn()

      jest.spyOn(blogService, 'viewBlog').mockResolvedValueOnce(expectedResponse.data)
      jest.spyOn(CustomResponse.prototype, 'sendResponse').mockResolvedValueOnce(expectedResponse)

      const response = await blogController.viewBlog(req, res, next)
      expect(blogService.viewBlog).toHaveBeenCalledWith(req.params.id, req.query)

      expect(response).toBe(expectedResponse)
    })
  })

  describe('Edit blog test', () => {
    it('Blog Edit Validation Error', async () => {
      const req = { body: { title: '' } }
      const res = {}
      const next = jest.fn()

      await blogController.editBlog(req, res, next)
      expect(next).toHaveBeenCalledWith(new BadRequestError('Validation Error', [{}]))
    })

    it('Edit blog successfull', async () => {
      const req = {
        body: {
          title: 'Hello world Edited',
          body: 'This is a trap Edited',
        },
        params: {
          id: '104303d0-0795-42aa-b7bb-31eab3671c26',
        },
      }
      const res = {}

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
      jest.spyOn(CustomResponse.prototype, 'sendResponse').mockResolvedValueOnce(expectedResponse)

      const response = await blogController.editBlog(req, res, next)

      expect(blogService.editBlog).toHaveBeenCalledWith(req.body, req.params.id)

      expect(response).toBe(expectedResponse)
    })
  })
})
