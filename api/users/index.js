const router = require('express').Router()
require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Users = require('./user-model')


router.get('/', async (req, res) => {
  const users = await Users.getUsers()

  res.status(200).json(users)
})


router.post('/register', async (req, res) => {
  const creds = req.body
  console.log(creds)

  try { 
    const existingUser = await Users.findBy('username', creds.username)
  
    if (existingUser){
      return res.status(409).json({ message: "Username not available."})
    }
    
    const hash = bcrypt.hashSync(creds.password)
    creds.password = hash

    const newUser = await Users.addUser(creds)

    res.status(201).json(newUser)
  } catch(err) {
    res.status(500).json({ message: err.message })
  }

})


router.post('/login', async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await Users.findBy('username', username)

    if (user && bcrypt.compareSync(password, user.password)){
      
      const jwtPayload = {
        user: user.id
      }

      const jwtOptions = {
        expiresIn: '7d'
      }

      const token = jwt.sign(jwtPayload, process.env.JWT_SECRET, jwtOptions)

      res
        .status(200)
        .json({ 
          message: `Welcome ${username}`,
          token: token
      })
    }

  } catch(err){
    res.status(500).json({ message: err.message })
  }
})

module.exports = router