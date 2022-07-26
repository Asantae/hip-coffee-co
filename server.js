const env = require('dotenv').config()
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const app = express()

mongoose.connect(process.env.mongoBase, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to database");
})
.catch((error) => {
    console.log("database connection failed. exiting now...")
    console.error(error)
    process.exit(1)
})

app.set('view engine', 'ejs');
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))

app.get('/', function(req, res) {
    res.render(path.join(__dirname + '/public/login.ejs'))
})



app.post('/login', async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({ username }).lean()

    if(!user) {
        return res.json({ status:'error', error: 'Invalid username/password' })
    }
    if(user && (await bcrypt.compare(password, user.password))){
        let lastLoggedInAt = new Date().toLocaleString('en-US') + " " + "(timezone is in EST)"
        lastLoggedInAt.toString()
        const token = jwt.sign({
            id: user._id,
            username: user.username,
            lastLogged: lastLoggedInAt
        }, process.env.JWT_SECRET, {
            expiresIn: '12h'
        })
        // update certain fields in db
        await User.findOneAndUpdate(
            {
                username: username,
            },
            {
                accessToken: token,
                loggedIn: true,
                lastLogged: lastLoggedInAt,
            }
        )
        res.json({ 
            status: 'ok',
            token: token,
            login: true,
        })
        } else {
        res.json ({ 
            status: 'ok', 
            error: 'Invalid username/password',
            login: false, 
        })
        console.log('Invalid username or password')
        }   
    
})

app.post('/dashboard', async (req, res) => {
    const { token } = req.body
    const user = await User.findOne({ token }).lean()

    if(token && user && (user.accessToken === token)) {
        /// Verify the token using jwt.verify method
        const decode = jwt.verify(token, process.env.JWT_SECRET)

        //  Return response with decode data
        res.json({
            login: true,
            data: decode,
            status: 'ok',
        });
    } else {
        // Return with error if jwt does not match
        res.json({
            login: false,
            data: "error",
            error: 'something went wrong',
        });
        console.log('token doesnt exist here')
    }
})

app.post('/register', async (req, res) => {
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

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})