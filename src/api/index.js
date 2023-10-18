const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcryptjs')
const nodeMailer = require('nodemailer');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Order = require('./models/Order');

const connectionString = "mongodb+srv://ahsanxaf:Ahsan@cluster0.80cggf5.mongodb.net/";

const app =  express();
const port = 8000;
app.use(cors());

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

app.listen(port, () => {
    console.log("Server is running on port ", port);
})

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB')
}).catch((err) => {
    console.log("Error connecting to MongoDb: ", err);
});

//function to send verification email to user
const sendVerificationEmail = async(email, verificationToken) => {
    //create a nodemailer trandport
    const transporter = nodeMailer.createTransport({
        //configure the email service
        service: 'gmail',
        auth: {
            user: 'ahsanfarooqxx69@gamil.com',
            pass: 'gm@il.com'
        },
    });

    //compose email message
    const mailOptions = {
        from: 'amazon.com',
        to: email,
        subject: 'Email Verification',
        text: `Please click the following link to verify your email: http://localhost:8000/verify/${verificationToken}`
    };

    //send the email
    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log('Error sending verification email: ', error);
    }
};

//endpoint to register in the app
app.post("/register", async(req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log(name, email, password)
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: 'Email already registered'});
        }
        // const newUser = new User({name, email, password});
        const verificationToken =  crypto.randomBytes(20).toString('hex');
        const hashedPassword = await bcrypt.hash(password, 12);
        console.log(verificationToken);
        const newUser = await User.create({name, email, password: hashedPassword, verificationToken})
        // newUser.verificationToken = crypto.randomBytes(20).toString('hex');
        // await newUser.save();
        if(newUser){
            return res.status(201).json({message: 'User registered'});
            
        }

        // sendVerificationEmail(newUser.email, newUser.verificationToken);

    } catch (error) {
        console.log('Error registering user: ', error);
        res.status(500).json({message: 'Registration Failed'})
    }
});

// endpoint to verify the email
app.get('/verify/:token', async(req, res) => {
    try {
        const token = req.params.token;

        //find the user with the given verification token
        const user = await User.findOne({verificationToken: token});
        comsole.log("Verified user: ", user);
        if(!user){
            console.log('aaaaaaaaaaaaaaaaaaa')
            return res.status(404).json({message: 'Invalid verification token'});
        }

        // mark the user as verify
        user.verified = true;
        user.verificationToken = undefined;
        await user.save();
        res.status(200).json({message: 'Email verified successfully'});

    } catch (error) {
        res.status(500).json({message: 'Email Verification Failed'});
    }
});

const generateSecretKey = () => {
    const secretKey = crypto.randomBytes(32).toString('hex');
    return secretKey;
}
const secretKey = generateSecretKey();

// endpoint to login the user
app.post("/login", async(req, res) => {
    try {
        const {email, password} = req.body;

        //check if the user exists
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({message: 'Invalid Email or Password'});
        }
        
        //check if the password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(401).json({message: 'Invalid Password'});
        }

        //generate a token
        const token = jwt.sign({userId: user._id}, secretKey);
        res.status(200).json({token});
    } catch (error) {
        res.status(500).json({message: 'Login Failed'});
    }
})

//endpoint to store a new address
app.post('/address', async(req, res) => {
    try {
        console.log('user: ')
        
        const {userId, address} = req.body;

        const user = await User.findById(userId);
        if(!user){
           return res.status(404).json({message: 'User not found'})
        }

        user.addresses.push(address);
        await user.save();
        res.status(200).json({message: 'Address added successfully'})

    } catch (error) {
        res.status(500).json({message: 'Error adding address'})
    }
})

// endpoint to get all the addresses of a particular user
app.get('/address/:userId', async(req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if(!user){
           return res.status(404).json({message: 'User not found'})
        }

        const addresses = user.addresses;
        res.status(200).json(addresses);

    } catch (error) {
        res.status(500).json({message: 'Error retrieving address'})
    }
})

//endpoint to store all the orders
app.post('/orders', async(req, res) => {
    try {
        const { userId, cartItems, totalPrice, shippingAddress, paymentMethod } = req.body;
        const user = await User.findById(userId);
        
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        //create an array of product objects from the cart Items
        const products = cartItems.map((item) => ({
          name: item?.title,
          quantity: item.quantity,
          price: item.price,
          image: item?.image,
        }));

        //create a new Order
        // const order = new Order({
        //     user: userId,
        //     products: products,
        //     totalPrice: totalPrice,
        //     shippingAddress: shippingAddress,
        //     paymentMethod: paymentMethod,
        // });

        const order = await Order.create({
            user: userId,
            products: products,
            totalPrice: totalPrice,
            shippingAddress: shippingAddress,
            paymentMethod: paymentMethod,
        })
        if(order){
            return res.status(200).json({ message: "Order created successfully!" });   
        }

    } catch (error) {
        console.log("error creating orders", error);
        res.status(500).json({ message: "Error creating orders" });
    }
})

//get the user profile
app.get("/profile/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving the user profile" });
  }
});

app.get("/orders/:userId",async(req,res) => {
  try{
    const userId = req.params.userId;

    const orders = await Order.find({user:userId}).populate("user");

    if(!orders || orders.length === 0){
      return res.status(404).json({message:"No orders found for this user"})
    }

    res.status(200).json({ orders });
  } catch(error){
    res.status(500).json({ message: "Error"});
  }
})
