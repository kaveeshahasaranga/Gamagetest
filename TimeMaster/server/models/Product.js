const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true, // e.g., 'Men', 'Women', 'Unisex'
    },
    images: [{
        type: String, // Array of image URLs
    }],
    stockCount: {
        type: Number,
        required: true,
        default: 0,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);
