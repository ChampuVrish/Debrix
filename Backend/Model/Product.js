const monggoose = require("mongoose");
const productSchema = new monggoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    category: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 }
});

const Product = monggoose.model("Product", productSchema);

module.exports = Product;