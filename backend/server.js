import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt-nodejs'

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise


const User = mongoose.model('User', {
  name: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex')
  },
  profileImage: {
    type: String,
    default: ''
  }
})

const authenticateUser = async (req, res, next) => {
  const user = await User.findOne({ accessToken: req.header('Authorization') })
  if (user) {
    req.user = user
    next()
  } else {
    res.status(401).json({ message: 'You must be logged in to see this message' })
  }
}



// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', async (req, res) => {
  const users = await User.find()
  res.json(users)
})


app.post('/users', async (req, res) => {
  try {
    const { name, email, password } = req.body
    const user = await new User({ name, email, password: bcrypt.hashSync(password) }).save()

    res.status(201).json({ id: user._id, accessToken: user.accessToken, profileImage: user.profileImage })
  } catch (err) {
    res.status(400).json({ message: "Could not create user", error: err })
  }
})

app.post('/sessions', async (req, res) => {
  const user = await User.findOne({ name: req.body.name });
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    res.json({ userId: user._id, accessToken: user.accessToken, profileImage: user.profileImage })
  } else {
    res.status(404).json({ error: "Invalid username or password" })
  }
})

app.get('/secrets', authenticateUser)

app.get('/secrets', async (req, res) => {
  const user = await User.findOne({ accessToken: req.header('Authorization') })
  res.json({ message: `Welcome ${user.name}` })
})

//find user and update profile image
app.post('/users/:id', async (req, res) => {
  const user = await User.findOneAndUpdate({ _id: req.params.id },
    { profileImage: req.body.image }, { new: true })
  res.json({ imageURL: user.profileImage })
})


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
