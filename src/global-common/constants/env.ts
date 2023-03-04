const MANDATORY_ENV_LIST = []

export function ensureMandatoryEnv (mandatoryEnvList) {
  mandatoryEnvList.forEach((envName) => {
    if (!process.env[envName]) {
      throw new Error(`Mandatory Environment Variable(${envName}) has not setup!`)
    }
  })
}

ensureMandatoryEnv(MANDATORY_ENV_LIST)

const { env } = process
const NODE_ENV = env.NODE_ENV || 'local'
export const commonEnv: any = {
  NODE_ENV,
  API_VERSION: env.API_VERSION || 'api/v1',
  IS_DEV_ENV: NODE_ENV === 'local' || NODE_ENV === 'development',

  ALTER_TABLE: env.ALTER_TABLE || '',
  MY_NAME: env.MY_NAME,

  BEBE_DIARY_PORT: env.BEBE_DIARY_PORT,

  BEBE_DB_URL: env.BEBE_DB_URL,

  JWT_SECRET_KEY: env.JWT_SECRET_KEY,
  JWT_ACCESS_EXPIRES_IN: env.JWT_ACCESS_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN: env.JWT_REFRESH_EXPIRES_IN,

  AWS_REGION: env.AWS_REGION,
  AWS_BUCKET: env.AWS_BUCKET,
}

const dbNameFromUrl = (url, defalutVal) => (url ? url.split('/').pop() : defalutVal)
commonEnv.BEBE_DB_NAME = dbNameFromUrl(commonEnv.BEBE_DB_NAME, 'bebe')
