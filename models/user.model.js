import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true, //quita espacios
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true, //unico
    },
    mobile: {
        type: Number,
        required: true,
        trim: true,
        unique: true, //email unico
    },
    password: {
        type: String,
        required: true,
    },
    rol_id: {
        type: String,
        default: "User",
        enum: ["user", "admin"],
    },
    membership_payments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "MembershipPayment",
        index: true,
    }],
    players_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    }],
    orders_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }],
    payments_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductPayment'
    }],

}, {
    timestamps: true,
}
)

export default mongoose.model("User", userSchema);