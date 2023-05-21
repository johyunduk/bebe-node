import multer from 'multer'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/images')
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${req.user.id}_${file.originalname}`)
  },
})

export const localUpload = multer({ storage })
