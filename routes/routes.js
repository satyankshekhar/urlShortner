const express = require('express')
const router = express.Router();
const { shortUrlCreateKardo, redirectKarDo, fileChalaDo, createUser } = require('../controller/controller')

const userModel = require('../models/user')

router.get('/', fileChalaDo);
router.get('/url/:id', redirectKarDo)
router.post('/url/', shortUrlCreateKardo)
router.post('/signup',createUser)

// router.post('/signup', async (req, res) => {
    
  
// });

module.exports = router