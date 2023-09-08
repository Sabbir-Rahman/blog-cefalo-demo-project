/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import { authorService } from '../../api/v1/services/index.js'
import { bcryptUtils, jwtUtils } from '../../api/v1/utils/index.js'
import { authorQuery } from '../../api/v1/queries'
import { BadRequestError } from '../../api/v1/errors'

describe('Auth Service Test', () => {
  describe('Testing Create Author Method', () => {
    test('Duplicate Mail', async () => {
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
  })
})
