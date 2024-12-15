const express=require('express');
const app= express();
const Campground=require('../models/campground');
const Review=require('../models/review.js');
const router=express.Router({mergeParams:true});
const catchAsync= require('../utilities/catchAsync');
const expressError=require('../utilities/expressError');
const {reviewSchema}= require('../schema.js');
const {validateReview, isLoggedIn,isReviewAuthor}= require('../middleware.js')
const reviews= require('../controllers/reviews.js');



// add review
router.post('/', isLoggedIn,validateReview, catchAsync (reviews.createReview))
  
  
  // delete a review
    router.delete('/:reviewId', isLoggedIn,isReviewAuthor,catchAsync(reviews.deleteReview))


 module.exports= router;
  