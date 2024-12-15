if(process.env.NODE_ENV !=="production"){
  require('dotenv').config();
}

// const dbUrl= process.env.DB_URL;

const dbUrl=   'mongodb://127.0.0.1:27017/yelpcamp'  ||  process.env.DB_URL;

const express=require('express');
const app=express();
const Review=require('./models/review.js');
// const joi=require('joi');
const {campgroundSchema,reviewSchema}= require('./schema.js');
const catchAsync= require('./utilities/catchAsync');
const expressError=require('./utilities/expressError');
// const bootstrap = require('bootstrap') 
const Campground=require('./models/campground');
const mongoose = require('mongoose');
const methodOverride= require('method-override');
const ejsMate=require('ejs-mate');
const flash=require('connect-flash');
const User=require('./models/user.js');
const session= require('express-session');
const passport=require('passport')
const localStrategy=require('passport-local');
const mongoSanitize= require('express-mongo-sanitize');
const helmet= require('helmet');
const MongoStore = require('connect-mongo');


const secret= process.env.SECRET || 'thisshouldbeabettersecret!'


const store = MongoStore.create({
  mongoUrl: dbUrl,
  touchAfter: 24 * 60 * 60,
  crypto: {
      secret
  }
});

store.on("error", function(e){
  console.log("session error",e);
})

const sessionConfig={
  store,
  secret, resave:false, saveUninitialized:true, name: 'session',
  cookie:{
    
     httpOnly:true,
    //  secure: true,
     expires: Date.now()+ 1000*60*60*24*7,
     maxAge:1000*60*60*24*7
  }
}


// 'mongodb://127.0.0.1:27017/yelpcamp'

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const campgroundsRoutes=require('./routes/campgrounds.js');
const reviewsRoutes=require('./routes/reviews.js')
const userRoutes= require('./routes/users.js')
app.use(mongoSanitize());
app.use(session(sessionConfig));
app.use(flash());
app.use(helmet());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req,res,next)=>{
 res.locals.currentUser=req.user;

    res.locals.success=req.flash('success');
    res.locals.error=req.flash('error');
    next();
})
const path=require('path');
const campground = require('./models/campground');
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:true}));
app.engine('ejs',ejsMate);
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'))
app.listen(3000,()=>{
    console.log("serving on  port 3000");
})


//helmet stuff


const scriptSrcUrls = [
  "https://stackpath.bootstrapcdn.com/",
  "https://api.tiles.mapbox.com/",
  "https://api.mapbox.com/",
  "https://kit.fontawesome.com/",
  "https://cdnjs.cloudflare.com/",
  "https://cdn.jsdelivr.net",
];
//This is the array that needs added to
const styleSrcUrls = [
  "https://kit-free.fontawesome.com/",
  "https://api.mapbox.com/",
  "https://api.tiles.mapbox.com/",
  "https://fonts.googleapis.com/",
  "https://use.fontawesome.com/",
  "https://cdn.jsdelivr.net",
  "https://stackpath.bootstrapcdn.com/"
];
const connectSrcUrls = [
  "https://api.mapbox.com/",
  "https://a.tiles.mapbox.com/",
  "https://b.tiles.mapbox.com/",
  "https://events.mapbox.com/",
];
const fontSrcUrls = [];
app.use(
  helmet.contentSecurityPolicy({
      directives: {
          defaultSrc: [],
          connectSrc: ["'self'", ...connectSrcUrls],
          scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
          styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
          workerSrc: ["'self'", "blob:"],
          objectSrc: [],
          imgSrc: [
              "'self'",
              "blob:",
              "data:",
              "https://res.cloudinary.com/dpw1c3vnu/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT! 
              "https://images.unsplash.com/",
          ],
          fontSrc: ["'self'", ...fontSrcUrls],
      },
  })
);






































app.get('/',(req,res)=>{
    res.render('home');
})

app.get('/fakeuser', async(req,res)=>{
  const user= new User ({email: 'colt@gmail.com', username:'coltt'});
  const newUser= await User.register(user,'chic');
  res.send(newUser);
})







app.use('/campgrounds',campgroundsRoutes)

app.use('/campgrounds/:id/reviews/',reviewsRoutes)

app.use('/', userRoutes);

app.use(express.static(path.join(__dirname,'public')))


// app.use((req, res, next) => {
//   console.log(req.user); 
//   res.locals.currentUser = req.user;
//   res.locals.success = req.flash('success');
//   res.locals.error = req.flash('error');
//   next();
// })


app.all(/(.*)/,(req,res,next)=>{
next(new expressError('Page Not Found',404));

})

app.use((err,req,res,next)=>{
const {status=500}= err;
if(!err.message) err.message='Oh No, Something Went Wrong!'
res.status(status).render('error',{err});
  // res.send('Something went wrong, very wrong!')
})


// app.get('/makecampground',async (req,res)=>{
// const  camp= new Campground({title:'my backyard',description:'cheap' });
// await camp.save();
// res.send(camp);
// })




// current admin amin 123