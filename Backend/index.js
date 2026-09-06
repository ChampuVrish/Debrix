const express = require("express");
const cors = require("cors");
require("dotenv").config();

const dotenv = require("dotenv");
const connectDB = require("./config/db");

connectDB();


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.send("Debrix Is Live!");
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productsRoutes.js'));
app.use('/api/orders', require('./routes/orderRoutes.js'));
// app.use('/api/payment', require('./routes/paymentRoutes'));
// app.use('/api/analytics', require('./routes/analyticsRoutes'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


