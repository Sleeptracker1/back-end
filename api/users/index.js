require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const Users = require('./user-model')
const restrict = require('./middleware/restrict')
const router = require('express').Router()


router.get('/', restrict, async (req, res) => {
  
  try {
    const users = await Users.getUsers()
  
    res.status(200).json(users)
    
  } catch(err) {
    res.status(500).json({ message: err.message })
  }
})

router.post('/register', async (req, res) => {
  const creds = req.body

  try { 
    const existingUser = await Users.findBy('username', creds.username)
  
    if (existingUser){
      return res.status(409).json({ message: "Username not available."})
    }
    
    const hash = bcrypt.hashSync(creds.password)
    creds.password = hash

    const newUser = await Users.addUser(creds)
    return res.status(201).json(newUser)

  } catch(err) {
    res.status(500).json({ message: err.message })
  }

})


router.post('/login', async (req, res) => {
  const { username, password } = req.body
  const authError = { message: 'Invalid credentials'}

  try {
    const user = await Users.findBy('username', username)

    if (!user){
      return res.status(401).json(authError)
    }

    const passwordValid = bcrypt.compare(password, user.password)

    if (!passwordValid){
      return res.status(401).json(authError)
    }
      
    const jwtPayload = { user: user.id }
    const jwtOptions = { expiresIn: '7d' }
    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET, jwtOptions)

    res
      .status(200)
      .json({ 
        message: `Welcome ${username}`,
        token: token
      })

  } catch(err){
    res.status(500).json({ message: err.message })
  }
})

module.exports = router