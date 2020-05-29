require('dotenv').config()
const multer = require('multer')
// const multerS3 = require('multer-s3')
// const aws = require('aws-sdk')

const storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, './assets/uploads/')
    },
    filename : function(req, file, cb){
        cb(null, Date.now()+file.originalname)
    }
})
const filefilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ){
        cb(null, true)
    }else{
        cb(null, "Only jpeg/jpg/png images are allowed")
    }
}
const upload = multer({
    storage: storage,
    limits : {
        fileSize : 1024 * 1024 * 5
    },
    fileFilter : filefilter
})

module.exports = {
    upload
}

// aws.config.update({
//     secretAccessKey : process.env.SECRETACCESS_KEY,
//     accessKeyId : process.env.ACCESS_KEYID
// })
// var s3 = new aws.S3()
// var upload = multer({
//     storage: multerS3({
//       s3: s3,
//       bucket: 'selfcheckin',
//       acl: 'public-read',
//       metadata: function (req, file, cb) {
//         cb(null, {fieldName: file.fieldname});
//       },
//       key: function (req, file, cb) {
//         cb(null, Date.now().toString())
//       }
//     })
//   })

//   module.exports = {
//       upload
//   }