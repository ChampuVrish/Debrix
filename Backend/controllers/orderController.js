const Order = require("../Model/Order");
const sendEmail = require("../utils/sendEmail");            

//Create Order
const createOrder = async (req, res) => {
    
    try {
        const { products, totalAmount, paymentId } = req.body;
        if(!products || products.length === 0 || !totalAmount || !paymentId) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        else {
            const order = new Order({
                user: req.user._id,
                products,
                totalAmount,
                paymentId
            });
            const savedOrder = await order.save();
            await sendEmail(req.user.email, "Order Created", `Your order has been created successfully. Order ID: ${savedOrder._id}`);
            res.status(201).json(savedOrder);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


//Get All Orders
const myOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).populate("user", "name email").populate("products.productId", "name price");
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("userId", "id name").populate("products.productId", "name price");
        res.status(200).json(orders);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);
        if (order) {
            order.status = status;
            await order.save();
            res.json({ message: "Order status updated successfully" });
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    }
        catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = {
    createOrder,
    myOrders,
    getOrders,
    updateOrderStatus
};