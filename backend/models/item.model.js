import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true,
    },

    status: {
        type: String,
        enum: ['sold', 'unsold'],
        default: 'unsold',
    },

    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    buyer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },

    image: {
        type: String
    }
})

const Item = mongoose.model('Item', itemSchema)

export default Item