const env = require('dotenv').config()
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


mongoose.connect(process.env.mongoBase, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = express()
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/login.html'))
})

app.post('/api/register', async (req, res) => {

    const { username, password: plainTextPassword } = req.body

    if(!username || typeof username !== 'string') {
        return res.json({status: 'error', error: 'Invalid Username'})
    }

    if (!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.json({ status: 'error', error: 'Invalid Password'})
    }

    if (plainTextPassword.length < 5) {
        return res.json({ status: 'error',  error: 'Password must be 6 characters or longer'})
    }

    const password = await bcrypt.hash(plainTextPassword, 15)

    try {
        const response = await User.create({
            username,
            password
        })
        console.log("user created successfully", response)
    } catch(error){
        if(error.code === 11000){
            return res.json({status: 'error', error: 'This username already exists'})
        }
        throw error
        console.log(JSON.stringify(error))
    }
    res.json({ status: 'ok'})
    
})

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})