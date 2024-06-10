import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product_ids: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }],
    selectedSize: {
        type: [String],
        enum: ["Talla única", "3XS", "2XS", "XS", "S", "M", "L", "XL", "XXL"],
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pendiente', 'completado', 'enviado', 'cancelado'],
        default: 'pendiente'
    },
    document: {
        type: Object,
        fieldname: String,
        originalname: String,
        encoding: String,
        mimetype: String,
        destination: String,
        filename: String,
        path: String,
        size: Number
    },
    contentType: {
        type: String,
        enum: ['application/pdf', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    }
}, {
    timestamps: true,
    collection: "orders",
    versionKey: false
});

// Crear el modelo a partir del esquema
const Order = mongoose.model('Order', orderSchema);

export default Order;