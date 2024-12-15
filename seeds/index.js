
const Campground=require('../models/campground');
const cities=require('./cities');
const mongoose = require('mongoose');
const {places, descriptors}= require('./seedHelpers');


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/yelpcamp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const sample = (array) => array[Math.floor(Math.random() * array.length)];
// const price= 
const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const camp = new Campground({
      author: '675851245a41a42f521468aa',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      
      description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis, adipisci!',
      price: Math.floor(Math.random()*30)+10,
      geometry: {type:'Point', coordinates:[
        cities[random1000].longitude,cities[random1000].latitude
      ] },
      images: [
        {
          url: 'https://res.cloudinary.com/dpw1c3vnu/image/upload/v1734000280/YelpCamp/wpamqtjpsy8vkj4y2quw.jpg',
          filename: 'YelpCamp/wpamqtjpsy8vkj4y2quw'
        
        },
        {
          url: 'https://res.cloudinary.com/dpw1c3vnu/image/upload/v1734000282/YelpCamp/qbtpw4wh1mjq6am8brzb.jpg',
          filename: 'YelpCamp/qbtpw4wh1mjq6am8brzb'
         
        }
      
      
    
    

      ]

    });
    await camp.save();
  }
};

seedDB().then(()=>{
  mongoose.connection.close();
})