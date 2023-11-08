import bcrypt from 'bcrypt'
import { bcryptUtils } from '../../api/v1/utils'
import constants from '../../../constants/default'
import { InternalServerError } from '../../api/v1/errors'

jest.mock('bcrypt')

describe('bcrypt urtils test', () => {
  describe('Hash Password Test', () => {
    it('Hash password successfull test', async () => {
      const excpectedHashPassword = 'scdkn23r0wfrwefwervf'
      const excpectedSalt = '3r0wfrwefwervf'
      
      const userPassword = '123456';
      (bcrypt.genSalt as jest.Mock).mockResolvedValue(excpectedSalt);
      
      (bcrypt.hash as jest.Mock).mockReturnValue(excpectedHashPassword);

      const hashPassword = await bcryptUtils.hashPassword(userPassword)

      expect(bcrypt.hash).toHaveBeenCalledWith(userPassword, excpectedSalt)
      expect(hashPassword).toBe(excpectedHashPassword)
    })
    it('Hash password failed test', async () => {
      const mockError = new InternalServerError(
        constants.errorMessage.SOMETHING_WRONG,
        'Password Not Hashed by bcrypt',
      )
      const excpectedSalt = '3r0wfrwefwervf'
      const userPassword = '123456';

      (bcrypt.genSalt as jest.Mock).mockResolvedValue(excpectedSalt);
      (bcrypt.hash as jest.Mock).mockRejectedValue(new Error('Error'));

      await expect(bcryptUtils.hashPassword(userPassword)).rejects.toThrow(mockError)
      expect(bcrypt.hash).toHaveBeenCalledWith(userPassword, excpectedSalt)
    })
  })
  describe('Compare Password Test', () => {
    it('Compare password successfull test', async () => {
      const userHashPassword = 'scdkn23r0wfrwefwervf'
      const userinputPassword = '123456';

      (bcrypt.compare as jest.Mock).mockResolvedValue(true)

      const comparePassword = await bcryptUtils.comparePassword(userinputPassword, userHashPassword)

      expect(bcrypt.compare).toHaveBeenCalledWith(userinputPassword, userHashPassword)
      expect(comparePassword).toBe(true)
    })
    it('Compare password failed test', async () => {
      const mockError = new InternalServerError(
        constants.errorMessage.SOMETHING_WRONG,
        'Password cannot be compared by bcrypt',
      )
      const userHashPassword = 'scdkn23r0wfrwefwervf'
      const userinputPassword = '123456';

      (bcrypt.compare as jest.Mock).mockRejectedValue(new Error('Error'))

      await expect(
        bcryptUtils.comparePassword(userinputPassword, userHashPassword),
      ).rejects.toThrow(mockError)
      expect(bcrypt.compare).toHaveBeenCalledWith(userinputPassword, userHashPassword)
    })
  })
})
