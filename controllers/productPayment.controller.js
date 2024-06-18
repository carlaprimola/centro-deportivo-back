import productPayment from "../models/productPayment.model.js";
import multer from 'multer';

// Configuración de multer para la carga de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// Crear un nuevo pago
export const createPayment = async (req, res) => {
  try {
    const { user_id, sumary, order_id } = req.body;
    const newPayment = new productPayment({
      user_id,
      sumary,
      order_id,
      product_payment: {
        status: false,
        document: ""
      }
    });
    await newPayment.save();
    res.status(201).json(newPayment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// Obtener todos los pagos
export const getAllPayments = async (req, res) => {
  try {
    const payments = await productPayment.find().populate('user_id');
    res.status(200).json(payments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// Obtener un pago por ID
export const getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await productPayment.findById(id).populate('user_id');
    if (!payment) return res.status(404).json({ message: 'Payment not found' });
    res.status(200).json(payment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// Actualizar un pago
export const updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, sumary, status, document } = req.body;
    const updatedPayment = await productPayment.findByIdAndUpdate(id, {
      user_id,
      sumary,
      product_payment: {
        status,
        document
      }
    }, { new: true });
    if (!updatedPayment) return res.status(404).json({ message: 'Payment not found' });
    res.status(200).json(updatedPayment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// Eliminar un pago
export const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPayment = await productPayment.findByIdAndDelete(id);
    if (!deletedPayment) return res.status(404).json({ message: 'Payment not found' });
    res.status(200).json({ message: 'Payment deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// Subir un documento PDF de pago
export const uploadPaymentDocument = [
  upload.single('document'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const payment = await productPayment.findById(id);
      if (!payment) return res.status(404).json({ message: 'Payment not found' });
      payment.product_payment.document = req.file.path;
      await payment.save();
      res.status(200).json(payment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
];
