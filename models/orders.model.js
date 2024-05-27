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
    summary: {
        type: String,

    },
    status: {
        type: String,
        enum: ['pendiente', 'completado', 'enviado', 'cancelado'],
        default: 'pendiente'
    },
    document: {
        type: String
    }
}, {
    timestamps: true,
    collection: "orders",
    versionKey: false
});

// Crear el modelo a partir del esquema
const Order = mongoose.model('Order', orderSchema);

export default Order;