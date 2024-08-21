import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true,
        unique: true,
    },

    email : {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    itemforSale: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Item"
        }
    ],

    purchasedItem : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Item"
        }
    ],

    balance: {
        type: Number,
        default: 1000,
    },

    favorites: [
        { type: mongoose.Schema.Types.ObjectId, 
          ref: "Item"
        }
    ]

},{timestamps: true})

const User = mongoose.model('User', userSchema)

export default User