/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import { v4 as uuidv4 } from 'uuid'
import { authorService } from '../../api/v1/services/index.js'
import { bcryptUtils, jwtUtils } from '../../api/v1/utils/index.js'
import { authorQuery } from '../../api/v1/queries'
import { BadRequestError } from '../../api/v1/errors'
import AuthorGeneralViewDto from '../../api/v1/dto/authors/authorGeneralView.dto.js'
import authorsDB from '../__mocks__/testDB.js'

jest.mock('uuid')

describe('Author Service Test', () => {
  describe('Testing Create Author Method', () => {
    it('Duplicate Mail', async () => {
      const inputData = {
        name: 'some name',
        email: 'name@gmail.com',
        password: '12345678',
      }
      const expectedError = new BadRequestError(
        'Email Duplicate',
        'This Email Already Exist try with another one',
      )
      // mocking query function
      jest.spyOn(authorQuery, 'authorDuplicateMail').mockResolvedValueOnce(true)

      await expect(authorService.createAuthor(inputData)).rejects.toThrow(expectedError)
      expect(authorQuery.authorDuplicateMail).toHaveBeenCalledWith(inputData.email)
    })
    it('Should Create User and Return Access Token', async () => {
      const inputData = {
        authorId: 'dwqqd221',
        name: 'some name',
        email: 'name@gmail.com',
        password: '12345678',
      }
      const expecteduserObj = {
        authorId: 'dwqqd221',
        name: 'some name',
        email: 'name@gmail.com',
      }

      const expectedResponse = {
        authorObj: new AuthorGeneralViewDto(expecteduserObj),
        accessToken: 'Some Token',
        refreshToken: 'Refresh Token',
      }

      uuidv4.mockReturnValue('dwqqd221')
      jest.spyOn(bcryptUtils, 'hashPassword').mockResolvedValueOnce('12345678')
      jest.spyOn(authorQuery, 'authorDuplicateMail').mockResolvedValueOnce(false)
      jest.spyOn(authorQuery, 'createAuthor').mockResolvedValueOnce(inputData)
      jest.spyOn(jwtUtils, 'generateAccessTokenRefreshTokenForUser').mockReturnValue({
        accessToken: expectedResponse.accessToken,
        refreshToken: expectedResponse.refreshToken,
      })

      const response = await authorService.createAuthor(inputData)

      expect(bcryptUtils.hashPassword).toHaveBeenCalledWith(inputData.password)
      expect(authorQuery.createAuthor).toHaveBeenCalledWith(inputData)
      expect(jwtUtils.generateAccessTokenRefreshTokenForUser).toHaveBeenCalledWith(inputData)

      expect(response).toStrictEqual(expectedResponse)
    })
  })
  describe('View Author Method', () => {
    it('View All Authors', async () => {
      const expectedResponse = [authorsDB]
      const expectedResponseWithDto = expectedResponse.map(
        (response) => new AuthorGeneralViewDto(response),
      )
      // mocking query function
      jest.spyOn(authorQuery, 'viewAuthors').mockResolvedValueOnce(expectedResponse)

      const response = await authorService.viewAuthor()

      expect(response).toStrictEqual(expectedResponseWithDto)
    })

    it('View Single Author', async () => {
      const expectedResponse = authorsDB[0]
      const authorId = '1d6464d8-2151-4147-810a-a3762a60aa3a'
      const expectedResponseWithDto = new AuthorGeneralViewDto(expectedResponse)

      // mocking query function
      jest.spyOn(authorQuery, 'getSingleAuthorById').mockResolvedValueOnce(expectedResponse)

      const response = await authorService.viewAuthor(authorId)

      expect(response).toStrictEqual(expectedResponseWithDto)
    })
  })
})
