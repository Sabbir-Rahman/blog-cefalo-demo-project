import { authorController } from '../../api/v1/controller'
import { authorService } from '../../api/v1/services'
import CustomResponse from '../../api/v1/utils/customResponse'

import { Request, Response } from 'express'

describe('Auth Controllert Test', () => {
  describe('Testing Create Author Method', () => {
    it('Author Create', async () => {
      const req = {
        body: {
          name: 'some name',
          email: 'name@gmail.com',
          password: '12345678',
        },
      } as Request
      const res = {} as Response
      const expectedResponse = {
        message: 'Author Created',
        developerMessage: '',
        data: {
          authorObj: {
            authorId: 'some id',
            name: 'name',
            email: 'name@gmail.com',
          },
          accessToken: 'some_access_token',
          refreshToken: 'some_refresh_token',
        },
      }
      const next = jest.fn()

      // Assert

      // mock service function
      jest.spyOn(authorService, 'createAuthor').mockResolvedValueOnce(expectedResponse as never)
      jest
        .spyOn(CustomResponse.prototype, 'sendResponse')
        .mockResolvedValueOnce(expectedResponse as never)

      // Assert
      const response = await authorController.createAuthor(req, res, next)
      expect(authorService.createAuthor).toHaveBeenCalledWith(req.body)

      expect(response).toBe(expectedResponse)
    })
    it('Author Create Error', async () => {
      const req = {
        body: {
          name: 'some name',
          email: 'name@gmail.com',
          password: '12345678',
        },
      } as Request
      const res = {} as Response
      const expectedError = new Error('Something Went Wrong')
      const next = jest.fn()

      // Assert

      // mock service function
      jest.spyOn(authorService, 'createAuthor').mockRejectedValueOnce(expectedError)

      await authorController.createAuthor(req, res, next)

      expect(next).toHaveBeenCalledWith(expectedError)
    })
  })

  describe('Testing Author View', () => {
    it('View All Author', async () => {
      const req = {
        params: {
          id: {},
        },
      } as unknown as Request
      const res = {} as Response
      const expectedResponse = {
        message: 'Author View Successfull',
        developerMessage: '',
        data: [
          {
            authorId: 'id',
            name: 'name',
            email: 'name@gmail.com',
          },
          {
            authorId: 'id',
            name: 'name2',
            email: 'name2@gmail.com',
          },
        ],
      }
      const next = jest.fn()

      // Assert

      // mock service function
      jest.spyOn(authorService, 'viewAuthor').mockResolvedValueOnce(expectedResponse as never)
      jest
        .spyOn(CustomResponse.prototype, 'sendResponse')
        .mockResolvedValueOnce(expectedResponse as never)

      // Assert
      const result = await authorController.viewAuthor(req, res, next)
      expect(authorService.viewAuthor).toHaveBeenCalledWith(req.params.id)

      expect(result).toBe(expectedResponse)
    })
    it('View Single Author', async () => {
      const req = { params: { id: 'id' } } as unknown as Request
      const res = {} as Response
      const expectedResponse = {
        message: 'Author View Successfull',
        developerMessage: '',
        data: {
          authorId: 'id',
          name: 'name',
          email: 'name@gmail.com',
        },
      }
      const next = jest.fn()

      // Assert

      // mock service function
      jest.spyOn(authorService, 'viewAuthor').mockResolvedValueOnce(expectedResponse as never)
      jest
        .spyOn(CustomResponse.prototype, 'sendResponse')
        .mockResolvedValueOnce(expectedResponse as never)

      // Assert
      const result = await authorController.viewAuthor(req, res, next)
      expect(authorService.viewAuthor).toHaveBeenCalledWith(req.params.id)

      expect(result).toBe(expectedResponse)
    })
    it('View Author Unsuccessfull', async () => {
      const req = { params: { id: 'id' } } as unknown as Request
      const res = {} as Response
      const expectedResponse = new Error('Error')
      const next = jest.fn()

      // Assert

      // mock service function
      jest.spyOn(authorService, 'viewAuthor').mockRejectedValue(expectedResponse as never)

      // Assert
      await authorController.viewAuthor(req, res, next)

      expect(next).toHaveBeenCalledWith(expectedResponse)
    })
  })
})
