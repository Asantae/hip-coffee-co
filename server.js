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
            username: user.username,
            lastLoggedIn: new Date().toLocaleString('en-US') + " " + " timezone is in GMT"
        }, process.env.JWT_SECRET, {
            expiresIn: '12h'
        })
        // update certain fields in db
        await User.findOneAndUpdate(
            {
                username: username,
                accessToken: null,
                loggedIn: false,
            },
            {
                username: username,
                accessToken: token,
                loggedIn: true,
            }
        )
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

app.post('api/dashboard', async (req, res) => {

})

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})