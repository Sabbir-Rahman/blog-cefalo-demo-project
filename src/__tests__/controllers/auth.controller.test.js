/* eslint-disable import/extensions */
import { authController, blogController } from '../../api/v1/controller/index.js'
import authService from '../../api/v1/services/auth.service.js'
import blogService from '../../api/v1/services/blog.service.js'
import CustomResponse from '../../api/v1/utils/customResponse.js'
import { mockDb } from '../__mocks__/index.js'

/* eslint-disable no-undef */
describe('Auth controller test', () => {
  describe('User login test', () => {
    it('User login successfull', async () => {
      const req = {
        body: {
          email: 'sabbir@gmail.com',
          password: 123456,
        },
      }
      const res = {}

      const expectedResponse = {
        isSuccess: true,
        statusCode: 200,
        message: 'Login successfull',
        developerMessage: '',
        isReadOnly: false,
        data: {
          userObj: mockDb.authorsDB[0],
          accessToken: 'Some access token',
          refreshToken: 'Some refresh token',
        },
      }
      const next = jest.fn()

      jest.spyOn(authService, 'userLogin').mockResolvedValueOnce(expectedResponse.data)
      jest.spyOn(CustomResponse.prototype, 'sendResponse').mockResolvedValueOnce(expectedResponse)

      const response = await authController.userLogin(req, res, next)

      expect(authService.userLogin).toHaveBeenCalledWith(req.body)

      expect(response).toBe(expectedResponse)
    })
    it('User Login Error', async () => {
      const req = {
        body: {
          email: 'name@gmail.com',
        },
      }
      const res = {}
      const expectedError = new Error('Password field not given')
      const next = jest.fn()

      // Assert

      // mock service function
      jest.spyOn(authService, 'userLogin').mockRejectedValueOnce(expectedError)

      await authController.userLogin(req, res, next)

      expect(next).toHaveBeenCalledWith(expectedError)
    })
  })

  describe('generate access token test', () => {
    it('Generation token successfull', async () => {
      const req = {
        body: {},
        refreshToken: 'Some refresh token',
      }
      const res = {}

      const expectedResponse = {
        isSuccess: true,
        statusCode: 200,
        message: 'Access Token Generation Successfull',
        developerMessage: '',
        isReadOnly: false,
        data: {
          accessToken: 'Some access token',
        },
      }
      const next = jest.fn()

      jest.spyOn(authService, 'generateRefreshToken').mockResolvedValueOnce(expectedResponse.data)
      jest.spyOn(CustomResponse.prototype, 'sendResponse').mockResolvedValueOnce(expectedResponse)

      const response = await authController.generateAccesstokenWithRefreshToken(req, res, next)

      expect(authService.generateRefreshToken).toHaveBeenCalledWith(req.refreshToken)

      expect(response).toBe(expectedResponse)
    })
    it('refresh token generation Error', async () => {
      const req = {
        body: {},
      }
      const res = {}
      const expectedError = new Error('Refresh token not given')
      const next = jest.fn()

      // Assert

      // mock service function
      jest.spyOn(authService, 'generateRefreshToken').mockRejectedValueOnce(expectedError)

      await authController.generateAccesstokenWithRefreshToken(req, res, next)

      expect(next).toHaveBeenCalledWith(expectedError)
    })
  })
})
