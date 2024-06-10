import multer from 'multer';

// Configurar Multer para manejar la subida de archivos PDF
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single('document');

export { upload };
