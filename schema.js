// const joi= require('joi');
const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
   type: 'string',
   base: joi.string(),
   messages: {
       'string.escapeHTML': '{{#label}} must not include HTML!'
   },
   rules: {
       escapeHTML: {
           validate(value, helpers) {
               const clean = sanitizeHtml(value, {
                   allowedTags: [],
                   allowedAttributes: {},
               });
               if (clean !== value) return helpers.error('string.escapeHTML', { value })
               return clean;
           }
       }
   }
});

const joi = BaseJoi.extend(extension)


const campgroundSchema=joi.object({
    campground: joi.object({
    title: joi.string().required().escapeHTML(),
    price:joi.number().required().min(0),
   //  image: joi.string().required(),
    location: joi.string().required().escapeHTML(),
    description: joi.string().required().escapeHTML()
    }).required(),
    deleteImages: joi.array()
    
    })

    module.exports={campgroundSchema};

    module.exports.reviewSchema= joi.object({
 review:joi.object( {
  rating: joi.number().required().min(1).max(5),
  body: joi.string().required().escapeHTML()

 }).required()


    })




















    