const router = require('express').Router();
const { signupValidation, loginValidation } = require('../middlewares/authValidation')
const {signup,login,} = require('../controllers/authcontroller');

router.post('/login',loginValidation,(req,res)=>login(req,res));

router.post('/signup',signupValidation,(req,res)=>signup(req,res));

module.exports = router;
