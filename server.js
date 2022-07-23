const env = require('dotenv').config()
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')


mongoose.connect(process.env.mongoBase, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
console.log('connected to database')
const app = express()
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/login.html'))
})



app.post('/api/login', async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({ username }).lean()

    if(!user) {
        return res.json({ status:'error', error: 'Invalid username/password' })
    }
    if(user && (await bcrypt.compare(password, user.password))){
        const token = jwt.sign({
            id: user._id,
            username: user.username
        }, process.env.JWT_SECRET, {
            expiresIn: '12h'
        })
        console.log(token)
        user.accessToken = token;
        console.log(user.accessToken)
        return res.json({ status: 'ok', data: token})
    } else {
        res.json ({ status: 'ok', error: 'Invalid username/password' })
        console.log('Invalid username or password')
    }
    
})

app.post('/api/register', async (req, res) => {
    const { username, password: plainTextPassword, reEnteredPass } = req.body

    if(!username || typeof username !== 'string') {
        return res.json({status: 'error', error: 'Invalid Username'})
    }

    if(username.length < 6) {
        return res.json({status: 'error', error: 'Username must be 6 characters or longer'})
    }

    if (!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.json({ status: 'error', error: 'Invalid Password'})
    }

    if (plainTextPassword.length < 8) {
        return res.json({ status: 'error',  error: 'Password must be 8 characters or longer'})
    }

    if (plainTextPassword !== reEnteredPass) {
        return res.json({ status: 'error', error: 'The passwords do not match'})
    }

    const password = await bcrypt.hash(plainTextPassword, 15)

    try {
        const response = await User.create({
            username,
            password
        })
        console.log("user created successfully", response)
        return res.json({ status: 'ok', response })
        
    } catch(error){
        if(error.code === 11000){
            return res.json({status: 'error', error: 'This username already exists'})
        }
        throw error
    }
})

//Token Authorization
const protect = asyncHandler(async (req, res, next) => {
    let token
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
     try{
         // Get token from header
         token = req.headers.authorization.split(' ')[1]
 
         //verify token
         const decoded = jwt.verify(token, process.env.JWT_SECRET)
 
         // Get user from the token
         req.user = await User.findById(decoded.id).select('-password')
 
         next()
     } catch (error) {
         console.log(error)
         res.status(401)
         throw new Error('Not Authorized')
     }
    }
    if(!token) {
     res.status(401)
     throw new Error('Not Authorized No Token')
    }
 })
 
 // Generate Token (JWT)
 const generateToken = (id) => {
     return jwt.sign({id}, process.env.JWT_SECRET, {
         expiresIn: '30d',
     })
 }

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})