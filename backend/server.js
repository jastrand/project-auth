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
    unique: true
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex')
  }
})

const authenticateUser = async (req, res, next) => {
  const user = await User.findOne({ accessToken: req.header('Authorization') })
  if (user) {
    req.user = user
    next()
  } else {
    res.status(401).json({ loggedOut: true })
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

// 5ec7d1f65a78606bf88a9b65
app.post('/users', async (req, res) => {
  try {
    const { name, email, password } = req.body
    const existingUsername = await User.findOne({ name: name })
    const existingEmail = await User.findOne({ email: email })
    if (!existingUsername && !existingEmail) {
      const user = await new User({ name, email, password: bcrypt.hashSync(password) })
      user.save()
      res.status(201).json({ id: user._id, accessToken: user.accessToken })
    } else {
      res.status(400).json({ error: 'email or username not unique' })
    }
  } catch (err) {
    res.status(400).json({ error: 'could not create user', errors: err.errors })
  }
})

app.post('/sessions', async (req, res) => {
  const user = await User.findOne({ name: req.body.name });
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    res.json({ userId: user._id, accessToken: user.accessToken })
  } else {
    if (!user) {
      res.status(404).json({ error: 'Username does not exist' })
    } else {
      res.status(400).json({ error: 'Invalid password' })
    }
  }
})

app.get('/secrets', authenticateUser)

app.get('/secrets', async (req, res) => {
  res.json({ message: 'you found the secret' })
})


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
