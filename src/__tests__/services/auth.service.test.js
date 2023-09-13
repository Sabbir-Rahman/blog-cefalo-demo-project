/* eslint-disable no-undef */
import { Http404DataNotFoundError, BadRequestError } from '../../api/v1/errors'
import { authService } from '../../api/v1/services'
import { authorQuery } from '../../api/v1/queries'
import { bcryptUtils, jwtUtils } from '../../api/v1/utils'
import { AuthorGeneralViewDto } from '../../api/v1/dto/authors'

describe('Auth service test', () => {
  describe('user login test', () => {
    it('User not exist error', async () => {
      const inputData = {
        email: 'name@gmail.com',
        password: '12345678',
      }
      const expectedError = new Http404DataNotFoundError(
        'User Not Exist',
        'No user is registered for this email, please create account or provide correct email',
      )
      // mocking query function
      jest.spyOn(authorQuery, 'getSingleAuthorByEmail').mockResolvedValueOnce(false)

      await expect(authService.userLogin(inputData)).rejects.toThrow(expectedError)
      expect(authorQuery.getSingleAuthorByEmail).toHaveBeenCalledWith(inputData.email)
    })
  })

  it('Password not match error', async () => {
    const inputData = {
      email: 'name@gmail.com',
      password: '12345678',
    }
    const user = {
      name: 'name',
      email: 'name@gmail.com',
      password: '12345678',
    }
    const expectedError = new BadRequestError(
      'Wrong Password',
      'Password not match for the user against the provided email',
    )
    // mocking query function
    jest.spyOn(authorQuery, 'getSingleAuthorByEmail').mockResolvedValueOnce(user)
    jest.spyOn(bcryptUtils, 'comparePassword').mockResolvedValueOnce(false)

    await expect(authService.userLogin(inputData)).rejects.toThrow(expectedError)
    expect(bcryptUtils.comparePassword).toHaveBeenCalledWith(inputData.password, user.password)
  })
  it('Successfull uer login', async () => {
    const inputData = {
      email: 'name@gmail.com',
      password: '12345678',
    }
    const user = {
      name: 'name',
      email: 'name@gmail.com',
      password: '12345678',
    }
    const expectedResponse = {
      userObj: new AuthorGeneralViewDto(user),
      accessToken: 'some access token',
      refreshToken: 'some refresh token',
    }
    // mocking query function
    jest.spyOn(authorQuery, 'getSingleAuthorByEmail').mockResolvedValueOnce(user)
    jest.spyOn(bcryptUtils, 'comparePassword').mockResolvedValueOnce(true)
    jest.spyOn(jwtUtils, 'generateAccessTokenRefreshTokenForUser').mockReturnValue({
      accessToken: expectedResponse.accessToken,
      refreshToken: expectedResponse.refreshToken,
    })

    const response = await authService.userLogin(inputData)
    expect(bcryptUtils.comparePassword).toHaveBeenCalledWith(inputData.password, user.password)

    expect(response).toStrictEqual(expectedResponse)
  })
  describe('refresh token generation', () => {
    it('Generate refresh token successfull', async () => {
      const user = {
        name: 'name',
        email: 'name@gmail.com',
        password: '12345678',
      }

      const expectedResponse = {
        accessToken: 'Some token',
      }

      jest.spyOn(jwtUtils, 'generateAccessTokenWithRefreshToken').mockReturnValue({
        accessToken: expectedResponse.accessToken,
      })

      const response = await authService.generateRefreshToken(user)
      expect(jwtUtils.generateAccessTokenWithRefreshToken).toHaveBeenCalledWith(user)

      expect(response).toStrictEqual(expectedResponse)
    })
  })
})
