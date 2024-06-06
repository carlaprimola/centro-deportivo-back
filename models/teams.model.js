import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true
    }
 
}, {
    timestamps: true,
    versionKey: false
}
)

export default mongoose.model("Team", teamSchema);