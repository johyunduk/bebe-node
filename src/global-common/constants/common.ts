import { commonEnv } from './env'
const { NODE_ENV, ALTER_TABLE } = commonEnv

export const NO_DEFAULT_LOGGER = commonEnv.NO_DEFAULT_LOGGER
export const IS_REAL_PRODUCTION = NODE_ENV === 'production'
export const syncOptions = { alter: ALTER_TABLE === 'true' }

export const PRODUCTION = 'production'
export const DEVELOPMENT = 'development'

export const UpperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
export const LowerCase = 'abcdefghijklmnopqrstuvwxyz'
export const Numbers = '0123456789'

export const corsOptions = {
  origin: ['https://www.mybebe.net', /https:\/\/.*\.mybebe\.net$/],
  credentials: true,
  optionSuccessStatus: 200,
}

export const MAX_STACK_SIZE = 1024

if (!IS_REAL_PRODUCTION) {
  corsOptions.origin.push(/http:\/\/.*\.mybebe\.net$/)
}

export const TEST_CODE_SYMBOL = 'x-e2e-test'
