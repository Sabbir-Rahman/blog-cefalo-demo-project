/* eslint-disable no-undef */
import jwt from 'jsonwebtoken'
import { jwtUtils } from '../../api/v1/utils'
import { InternalServerError } from '../../api/v1/errors'
import constants from '../../../constants/default'

jest.mock('jsonwebtoken')
describe('jwt utils test', () => {
  describe('sign jwt', () => {
    it('sign jwt successfull', () => {
      const object = {}
      const options = {}
      const algorithm = 'RS256'
      const mockToken = 'jasxerjhswdwefwefawefrgwafgweggweaeg'
      jwt.sign.mockReturnValue(mockToken)

      const result = jwtUtils.signJwt(object, options)

      expect(jwt.sign).toHaveBeenCalledWith(object, expect.anything(), {
        ...(options && options),
        algorithm,
      })

      expect(result).toBe(mockToken)
    })
    it('sign jwt failed', () => {
      const object = {}
      const options = {}
      const algorithm = 'RS256'
      const mockError = new InternalServerError(constants.errorMessage.SOMETHING_WRONG, 'Error')
      jwt.sign.mockRejectedValue(new Error('Error'))

      expect(jwtUtils.signJwt(object, options)).rejects.toThrow(mockError)
      expect(jwt.sign).toHaveBeenCalledWith(object, expect.anything(), {
        ...(options && options),
        algorithm,
      })
    })
  })
  describe('verify jwt', () => {
    it('verify jwt successfull', () => {
      const decodeObject = {
        userId: '65411wd',
        iat: '614634136',
        exp: '714313211',
      }
      const expectedDecoded = {
        valid: true,
        expired: false,
        decoded: decodeObject,
      }
      const mockToken = 'jasxerjhswdwefwefawefrgwafgweggweaeg'
      jwt.verify.mockReturnValue(decodeObject)

      const result = jwtUtils.verifyJwt(mockToken)

      expect(jwt.verify).toHaveBeenCalledWith(mockToken, expect.anything())

      expect(result).toStrictEqual(expectedDecoded)
    })
    it('verify jwt failed', () => {
      const expectedDecoded = {
        valid: false,
        decoded: null,
      }
      const mockToken = 'jasxerjhswdwefwefawefrgwafgweggweaeg'
      jwt.verify.mockReturnValue(null)

      const result = jwtUtils.verifyJwt(mockToken)

      expect(jwt.verify).toHaveBeenCalledWith(mockToken, expect.anything())

      expect(result).toStrictEqual(expectedDecoded)
    })
  })
})