import aws from 'aws-sdk'
import { commonEnv } from '@global-common/constants/env'
import multerS3 from 'multer-s3'
import { getLogger } from '@global-common/utils/logger'

const logger = getLogger('upload.ts')

const s3 = new aws.S3({ region: commonEnv.AWS_REGION })
const bucket = commonEnv.AWS_BUCKET

export const commonConfigure = {
  s3,
  bucket,
  acl: 'public-read',
  serverSideEncryption: 'AES256',
  contentType: multerS3.AUTO_CONTENT_TYPE,
  metadata: function (req, file, cb) {
    cb(null, getMetadata(file))
  },
}

function getMetadata (file) {
  logger.info('__getMetadata__')
  logger.info(file)
  return {
    fieldname: file.fieldname,
    originalname: encodeURIComponent(file.originalname),
    mimetype: file.mimetype,
  }
}
