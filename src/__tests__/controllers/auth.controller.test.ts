import { describe, it, expect } from '@jest/globals';
import { authController } from '../../api/v1/controller'
import authService from '../../api/v1/services/authService'
import CustomResponse from '../../api/v1/utils/customResponse'
import { mockDb } from '../__mocks__'
import { Request, Response } from 'express';

describe('Auth controller test', () => {
  describe('User login test', () => {
    it('User login successfull', async () => {
      const req: Request = {
        body: {
          email: 'sabbir@gmail.com',
          password: 123456,
        },
      } as Request

      const res = {} as Response

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
      // how mockResolvedValueOnce expect never type
      jest.spyOn(CustomResponse.prototype, 'sendResponse').mockResolvedValueOnce(expectedResponse as never)

      const response = await authController.userLogin(req, res, next)

      expect(authService.userLogin).toHaveBeenCalledWith(req.body)

      expect(response).toBe(expectedResponse)
    })
    it('User Login Error', async () => {
      const req = {
        body: {
          email: 'name@gmail.com',
        },
      } as Request
      const res = {} as Response
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
      } as Request
      
      const res = {} as Response
      const refreshToken= 'Some refresh token'

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
      jest.spyOn(CustomResponse.prototype, 'sendResponse').mockResolvedValueOnce(expectedResponse as never)

      const response = await authController.generateAccesstokenWithRefreshToken(req, res, next)

      expect(authService.generateRefreshToken).toHaveBeenCalledWith(refreshToken)

      expect(response).toBe(expectedResponse)
    })
    it('refresh token generation Error', async () => {
      const req = {
        body: {},
      } as Request
      const res = {} as Response
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
