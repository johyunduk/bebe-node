import * as bcrypt from 'bcryptjs'

export const encrypt = (password) => {
  const salt = bcrypt.genSaltSync()
  const hash = bcrypt.hashSync(password, salt)
  return hash
}

export const validateCode = (plain, hashed) => {
  return bcrypt.compareSync(plain, hashed)
}
