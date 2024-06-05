const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/Users');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://USERID:PASSWORD@cluster0.pfahtcu.mongodb.net/CURD?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("database connected"))
  .catch((err) => console.log(err));

app.put('/userUpdate/:id',(req,res) =>{
    const id = req.params.id;
    UserModel.findByIdAndUpdate({_id:id}, {name:req.body.name, email: req.body.email, age: req.body.age})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})
app.delete('/userDelete/:id',(req,res) =>{
    const id = req.params.id;
    UserModel.findByIdAndDelete(id)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json({ message: "User deleted successfully" });
        })
        .catch(err => res.status(500).json({ message: err.message }));
})

app.get('/user/:id', (req,res) =>{
    const id = req.params.id;
    UserModel.findById({_id:id})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})
app.get('/', (req,res) =>{
    UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.post("/create", (req, res) => {
    UserModel.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.json(err));
});

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
