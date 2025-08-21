const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model("products", productSchema)