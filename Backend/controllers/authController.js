const User = require("../Model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
}

// Register User
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    // TODO: Hash the password before saving it to the database
    // TODO: Implement JWT token generation and return it in the response for authentication purposes.
    // TODO: OTP sending and verification for email confirmation.
    // TODO: Welcome email sending after successful registration.

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({name,email,password: hashedPassword});
    if(user)
    {
      const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
      const message = `
      Welcome To Debrix, ${name}! Thank you for registering with us. Your account has been created successfully.
      Your OTP for email verification is: ${otp}`;

      try {
        await sendEmail(email, "Welcome to Debrix - Email Verification", message);
      } catch (emailError) {
        console.error("Registration email failed (non-fatal):", emailError.message);
      }

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
        message: "User registered successfully. Please check your email for OTP verification."
      });

    }
    else{
      res.status(400).json({ message: "Invalid user data" });
    }
  }catch (error) {
    console.error("Register error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};


//Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.find({}).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = { registerUser, loginUser, getUser };