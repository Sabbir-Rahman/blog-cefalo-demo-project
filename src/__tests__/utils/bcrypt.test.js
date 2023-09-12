/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import bcrypt from 'bcrypt'
import { bcryptUtils } from '../../api/v1/utils/index.js'
import constants from '../../../constants/default.js'
import { InternalServerError } from '../../api/v1/errors/index.js'

jest.mock('bcrypt')

describe('bcrypt urtils test', () => {
  describe('Hash Password Test', () => {
    it('Hash password successfull test', async () => {
      const excpectedHashPassword = 'scdkn23r0wfrwefwervf'
      const excpectedSalt = '3r0wfrwefwervf'
      const userPassword = '123456'

      bcrypt.genSalt.mockResolvedValue(excpectedSalt)
      bcrypt.hash.mockResolvedValue(excpectedHashPassword)

      const hashPassword = await bcryptUtils.hashPassword(userPassword, excpectedSalt)

      expect(bcrypt.hash).toHaveBeenCalledWith(userPassword, excpectedSalt)
      expect(hashPassword).toBe(excpectedHashPassword)
    })
    it('Hash password failed test', async () => {
      const mockError = new InternalServerError(
        constants.errorMessage.SOMETHING_WRONG,
        'Password Not Hashed by bcrypt',
      )
      const excpectedSalt = '3r0wfrwefwervf'
      const userPassword = '123456'

      bcrypt.genSalt.mockResolvedValue(excpectedSalt)
      bcrypt.hash.mockRejectedValue(mockError)

      await expect(bcryptUtils.hashPassword(userPassword, excpectedSalt)).rejects.toThrow(mockError)
      expect(bcrypt.hash).toHaveBeenCalledWith(userPassword, excpectedSalt)
    })
  })
})
