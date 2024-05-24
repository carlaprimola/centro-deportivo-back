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
        default: "user",
        enum: ["user", "admin"],
    },
    member_payment_status: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MembershipPayment",
        required: false,
        index: true,
      },
    players_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'players'
    }]

}, {
    timestamps: true,
}
)

export default mongoose.model("User", userSchema);