const express = require('express');
const app = express();
const authController = require('../controller/auth.controller');
require('dotenv').config();

app.use(express.json());

app.post('/register', authController.registerUser);
app.post('/login', authController.loginUser);

app.get('/',(req,res)=>{
    res.send("App is running on the port 3000 you can check sonal")
})

module.exports = app;