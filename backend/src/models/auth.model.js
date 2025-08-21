const mongoose = require("mongoose")

const authScheme = mongoose.Schema({
    username: {
        type: String,
        required: false
    },
    email: {
        type:String,
        required:false
    },
    password: {
        type: String,
        required: false
    },
    profileImage: {
        type: String,
        default: "https://static.vecteezy.com/system/resources/thumbnails/024/624/549/small_2x/3d-rendering-person-icon-3d-render-blue-user-sign-icon-png.png"
    },
    phone: {
        type: String,
        required: false,
        unique: true
    },
    history: [

    ],
    role: {
        type: String,
        enum: ["admin", "customer"],
        default: "customer"
    },
    basket: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products"
        }
    ]
})

module.exports = mongoose.model("auth", authScheme);