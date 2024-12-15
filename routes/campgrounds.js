const express=require('express');
const app= express();
const router=express.Router();
const catchAsync= require('../utilities/catchAsync');
const expressError=require('../utilities/expressError');
const Campground=require('../models/campground');
const {campgroundSchema}= require('../schema.js');
const {isLoggedIn,isAuthor,validateCampground}= require('../middleware.js');
const campgrounds= require('../controllers/campgrounds.js');
const multer  = require('multer')
const { storage}=require('../cloudinary');
const upload = multer({ storage });

router.route('/')
  .get(catchAsync(campgrounds.index))
  .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground));


router.get('/new', isLoggedIn,campgrounds.renderNewForm )

router.route('/:id')
.get(catchAsync(campgrounds.showCampground ))
.put(isLoggedIn, isAuthor,upload.array('image') ,validateCampground,catchAsync(campgrounds.updateCampground))
.delete(isLoggedIn,isAuthor, catchAsync(campgrounds.deleteCampground))




//index page
// router.get('/', )


  // create new page





  // post new campground
  // router.post('/', )
  
  
  
  //show page
  // router.get('/:id',)
  
  
  // load edit page
  router.get('/:id/edit',isLoggedIn ,isAuthor, catchAsync(campgrounds.renderEditForm))
  
  // edit using put route (okay)
  // router.put('/:id',)
  
  //delete campground
    // router.delete('/:id', )


module.exports=router;  