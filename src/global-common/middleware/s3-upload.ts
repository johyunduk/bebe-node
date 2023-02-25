import aws from 'aws-sdk'
import { commonEnv } from '@global-common/constants/env'
import multerS3 from 'multer-s3'
import { getLogger } from '@global-common/utils/logger'
import _ from 'lodash'
import { BadRequest, INVALID_INPUT } from '@global-common/error/http-error'

const logger = getLogger('upload.ts')

const s3 = new aws.S3({ region: commonEnv.AWS_REGION })
const bucket = commonEnv.AWS_BUCKET
const limits = { fileSize: 20 * 1024 * 1024 }
const fileWhiteList = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']
const fileFilter = (req, file, cb) => {
  _.includes(fileWhiteList, file.mimetype) ? cb(null, true) : cb(new BadRequest(INVALID_INPUT, `Do not allow type: ${file.mimetype}`))
}
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
