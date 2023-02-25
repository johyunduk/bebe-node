
import aws from 'aws-sdk'
import { commonEnv } from '@global-common/constants/env'
import { getLogger } from '@global-common/utils/logger'
import { BadRequest, EXT_API_CALL_FAIL, InternalServerError, NO_DATA } from '@global-common/error/http-error'
import { PRIVATE_IMAGE_EXPIRES } from '@global-common/constants/constants'

const logger = getLogger('s3-download.ts')

const s3 = new aws.S3({ region: commonEnv.AWS_REGION })
const bucket = commonEnv.AWS_BUCKET

async function fileInfoInS3 (key: string) {
  logger.info('fileInfoInS3 = ', key)
  const params = {
    Bucket: bucket,
    Key: key,
  }

  try {
    const data = await s3.headObject(params).promise()
    return data
  } catch (err) {
    logger.warn('Fail to get file Info. on S3: ')
    logger.warn(err)
    throw new BadRequest(NO_DATA, '파일을 찾을 수가 없습니다.')
  }
}

function getStreamFromS3 (fileName: string) {
  logger.info('getStreamFromS3 =', fileName)
  const params = {
    Bucket: bucket,
    Key: fileName,
  }

  try {
    return s3.getObject(params).createReadStream()
  } catch (err) {
    logger.warn(err)
    throw new InternalServerError(EXT_API_CALL_FAIL, 'Fail to download from S3')
  }
}

export async function downloadFile (params: {
  fileName: string
  res: any
  next: any
}) {
  /*
    stream으로 브라우저에 파일을 전달하려면 return header의 Content-Length에 파일크기정보가 필요하다.
    Content-Length이 set 되지 않으면 파일을 브라우저에서 저장을 하지 못함.
    따라서 먼저 파일에 대한 정보만 가져와서 크기를 가져옴.
  */
  const { fileName, res, next } = params
  const { ContentLength } = await fileInfoInS3(fileName)
  res.set('Content-Disposition', `attachment; filename=${fileName}`)
  res.set('Content-Type', 'application/octet-stream')
  res.set('Content-Length', ContentLength)

  getStreamFromS3(fileName).on('error', next).pipe(res)
}

export async function getS3FileList (prefix: string) {
  logger.info('getS3FileList')

  const params = {
    Bucket: bucket,
    MaxKeys: 10,
    Prefix: prefix, // ex) laundry/459
  }

  try {
    return s3.listObjects(params).promise()
  } catch (err) {
    logger.warn(err)
    throw new InternalServerError(EXT_API_CALL_FAIL, 'Fail to files list from S3')
  }
}

export const signedUrlOfS3 = async (key: string) => {
  await fileInfoInS3(key)
  const params = {
    Bucket: bucket,
    Key: key,
    Expires: PRIVATE_IMAGE_EXPIRES,
  }
  try {
    return s3.getSignedUrlPromise('getObject', params)
  } catch (err) {
    logger.warn(err)
    throw new InternalServerError(EXT_API_CALL_FAIL, 'Fail to signed url from S3')
  }
}
