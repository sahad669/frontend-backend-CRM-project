import mongoose, { Types } from 'mongoose'
const customerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true }
})

const customerModel = mongoose.model('customer',customerSchema)
export default customerModel