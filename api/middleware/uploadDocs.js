const multer = require('multer');

module.exports = (multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './api/public/upload/docsUsers')
        },

        filename: (req, file, cb) => {
            cb(null, Date.now().toString() + "_" + file.originalname)
        }
    }),

    fileFilter: (req, file, cb) => {
        const extensionFile = ['application/pdf']
        .find(formatoAceito => formatoAceito == file.mimetype);

        if(extensionFile) {
            return cb(null, true)
        }

        return cb(null, false)
    }
}))