const dotenv = require('dotenv')
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const UserModel = require('./models/Users'); // Ensure the correct path to your UserModel


// dotenv.config({
//     path:'./.env'
// })
const app = express();
app.use(cors({
    origin: ['https://curd-simple-frontend.vercel.app'],
    credentials: true
}))
app.use(express.json());

mongoose.connect("mongodb+srv://social-app:social-app123@cluster0.pfahtcu.mongodb.net/CURD?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

// Update user by ID
app.put('/userUpdate/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            id,
            { name: req.body.name, email: req.body.email, age: req.body.age },
            { new: true, runValidators: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete user by ID
app.delete('/userDelete/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await UserModel.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get user by ID
app.get('/user/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all users
app.get('/', async (req, res) => {
    try {
        const users = await UserModel.find({});
        // res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new user
app.post('/create', async (req, res) => {
    try {
        const newUser = await UserModel.create(req.body);
        res.status(201).json(newUser);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
        
    }
});

// Register a new user with hashed password
app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await UserModel.create({ name, email, password: hashedPassword });
        res.status(201).json({ message: "Account Created", user: newUser });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

const port = process.env.PORT;

app.listen(7000, () => {
    console.log(`Server is running on port: ${port}`);
});
