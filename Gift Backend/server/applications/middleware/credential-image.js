const multer = require('multer');
const fs = require('fs');
const common = require('../classes/common');

module.exports = multer({
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            let path = `./publis`;
            if(!fs.existsSync(path)) {
                fs.mkdirsSync(path);
            }
            callback(null, path);
        },
        filename: (req, file, callback) => {
            //originalname is the uploaded file's name with extn
            callback(null, Date.now() + "_" + file.originalname);
        }
    })
}).single('credential');