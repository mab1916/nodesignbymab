const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express();

app.use(express.json());

app.use(express.urlencoded());

app.use(cors());

// const uri = "mongodb://localhost:27017/MabJWT";
const uri = "mongodb+srv://mabusers:MabUsers123@cluster0.jye4y.mongodb.net/MabLogin?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('connected');
})

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
})

const User = new mongoose.model('User', userSchema)

app.post('/login', function (req, res) {
    const { email, password } = req.body;

    User.findOne({ email: email }, (error, user) => {
        if (user) {
            if (password === user.password) {
                res.send({ message: "Login Successfull", user: user })
            } else {
                res.send({ message: "Email or Password Did not match" })
            }
        } else {
            res.send({ message: "User not register" })
        }
    })
})

app.post('/register', function (req, res) {
    const { name, email, password } = req.body;

    User.findOne({ email: email }, (error, user) => {
        if (user) {
            res.send({ message: "User already register" })
        } else {
            const user = new User({
                name, email, password
            })
            user.save(error => {
                if (error) {
                    res.send(error)
                } else {
                    res.send({ message: "Register Success, Please Login Now" })
                }
            })
        }
    })

})

app.listen(3456);
