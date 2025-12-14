const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create uploads directory if it doesn't exist
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  // Expanded file types for educational schedules and documents
  const allowedTypes = /jpeg|jpg|png|gif|bmp|webp|pdf|doc|docx|xls|xlsx|ppt|pptx|txt|rtf|odt|ods|csv|zip|rar|7z/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());

  // More comprehensive MIME type checking
  const imageTypes = /image\/(jpeg|jpg|png|gif|bmp|webp)/;
  const documentTypes = /application\/(pdf|msword|vnd\.openxmlformats|vnd\.ms|vnd\.oasis|zipped-shp)/;
  const textTypes = /text\//;
  const mimetype = imageTypes.test(file.mimetype) || documentTypes.test(file.mimetype) || textTypes.test(file.mimetype) || allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Invalid file type. Allowed: Images (jpg, png, gif, bmp, webp), Documents (PDF, Word, Excel, PowerPoint, ODT, ODS), and Archives (ZIP, RAR, 7Z). File not allowed.'));
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5242880 // 5MB default
  },
  fileFilter: fileFilter
});

module.exports = upload;
