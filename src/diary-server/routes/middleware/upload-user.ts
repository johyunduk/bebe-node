import multer from 'multer'
import multerS3 from 'multer-s3'
import _ from 'lodash'
import { BadRequest, INVALID_INPUT } from '@global-common/error/http-error'
import { commonConfigure } from '@global-common/middleware/s3-upload'

const limits = { fileSize: 20 * 1024 * 1024 }
const fileWhiteList = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']
const fileFilter = (req, file, cb) => {
  _.includes(fileWhiteList, file.mimetype)
    ? cb(null, true)
    : cb(new BadRequest(INVALID_INPUT, `Do not allow type: ${file.mimetype}`))
}

const userStorage = (folder: string) => {
  return multerS3({
    ...commonConfigure,
    key: function (req, file, cb) {
      cb(null, `diary/${req.user.id}/${folder}/${Date.now().toString()}_${file.originalname}`)
    },
  })
}

const userPrivateStorage = (folder: string) => {
  return multerS3({
    ...commonConfigure,
    acl: 'privates',
    key: function (req, file, cb) {
      cb(null, `diary/${req.user.id}/${folder}/${Date.now().toString()}_${file.originalname}`)
    },
  })
}

export const userUpload = (folder: string) => {
  return multer({ storage: userStorage(folder), limits, fileFilter })
}

export const workerPrivateUpload = (folder: string) => {
  return multer({ storage: userPrivateStorage(folder), limits, fileFilter })
}
