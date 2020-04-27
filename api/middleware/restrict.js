require('dotenv').config()
const jwt = require('jsonwebtoken')

const restrict = (req, res, next) => {

  const token = req.get('authorization')

  if (!token){
    res.status(403).json({ message: 'Invalid credentials.'})
  }

  const verified = jwt.verify(token, )


}