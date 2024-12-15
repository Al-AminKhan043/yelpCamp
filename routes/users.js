const express=require('express');
const app= express();
const { storeReturnTo } = require('../middleware');
const User= require('../models/user');
const router=express.Router();
const catchAsync=require('../utilities/catchAsync');
const passport = require('passport');
const users=require('../controllers/users');



router.route('/register')
.get(users.renderRegister)
.post(catchAsync( users.register))

router.route('/login')
.get((users.renderLogin))
.post(storeReturnTo,passport.authenticate('local',{failureFlash:true, failureRedirect:'/login'}),users.login)

// reg form load
// router.get('/register',)

// reg form submit
// router.post('/register', );

//load login form

// router.get('/login',)

// login submit

// router.post('/login',  )

router.get('/logout', users.logout);

module.exports= router;