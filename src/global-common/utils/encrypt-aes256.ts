import crypto from 'crypto'
import { commonEnv } from '@global-common/constants/env'
import { getLogger } from '@global-common/utils/logger'

const logger = getLogger('encrypt-aes256.ts')

const algorithm = 'aes-256-cbc'

// query: select TO_BASE64(aes_encrypt(plain, ENCRYPT_KEY, sha2(ENCRYPT_KEY, 256));
export const encryptWithAES = (plain: string) => {
  logger.info('encryptWithAES')
  const hashed = crypto.createHash('sha256').update(commonEnv.ENCRYPT_KEY).digest('hex')

  // key는 32바이트, iv는 16바이트
  const cipher = crypto.createCipheriv(algorithm, commonEnv.ENCRYPT_KEY, hashed.slice(0, 16))
  let encrypted = cipher.update(plain, 'utf8', 'base64')
  encrypted += cipher.final('base64')

  return encrypted
}

// query: select aes_decrypt(FROM_BASE64(phone),ENCRYPT_KEY, sha2(ENCRYPT_KEY,256));
export const decryptWithAES = (encrypted: string) => {
  logger.info('decryptWithAES')
  const hashed = crypto.createHash('sha256').update(commonEnv.ENCRYPT_KEY).digest('hex')

  const deciper = crypto.createDecipheriv(algorithm, commonEnv.ENCRYPT_KEY, hashed.slice(0, 16))
  let plain = deciper.update(encrypted, 'base64', 'utf8')
  plain += deciper.final('utf8')

  return plain
}
