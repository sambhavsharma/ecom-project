import multer from 'multer';

export const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, '/Users/sasharma/media');
    },
    filename(req, file, callback) {
        callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
    },
});