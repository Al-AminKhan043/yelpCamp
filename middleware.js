const Campground=require('./models/campground');
const {campgroundSchema}= require('./schema.js');
const Review=require('./models/review.js');
const expressError=require('./utilities/expressError');
const {reviewSchema}= require('./schema.js');


module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl; // add this line
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}

//gpt







// module.exports.storeReturnTo = (req, res, next) => {
//     if (req.session.returnTo) {
//         res.locals.returnTo = req.session.returnTo;
//     }
//     next();
// }

//gpt
module.exports.storeReturnTo = (req, res, next) => {
  if (req.session.returnTo) {
      res.locals.returnTo = req.session.returnTo;
      delete req.session.returnTo; // Clear the returnTo value after setting it
  }
  next();
};



module.exports.validateCampground=(req,res,next)=>{

    const {error}= campgroundSchema.validate(req.body);
    if(error){
      const msg=error.details.map(el=>el.message).join(',')
    throw new expressError(msg,400);
    }
    else {
      next();
    }
    // console.log(result);
    }



module.exports.isAuthor= async (req,res,next)=>{
  const {id}= req.params;
  const campground= await Campground.findById(id);
          if(! campground.author.equals(req.user._id)){
            req.flash('error', 'You do not have permission to do that!');
           return  res.redirect(`/campgrounds/${campground._id}`)
          }
          next();
}


module.exports.isReviewAuthor= async (req,res,next)=>{
    const {id,reviewId}= req.params;
    const review= await Review.findById(reviewId);
            if(! review.author.equals(req.user._id)){
              req.flash('error', 'You do not have permission to do that!');
             return  res.redirect(`/campgrounds/${campground._id}`)
            }
            next();
  }


module.exports.validateReview=(req,res,next)=>{
    const{error}= reviewSchema.validate(req.body);
    if(error){
      const msg=error.details.map(el=>el.message).join(',')
    throw new expressError(msg,400);
    }
    else {
      next();
    }
  }