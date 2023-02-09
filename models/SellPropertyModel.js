const mongoose = require('mongoose')

const SellProperty = mongoose.Schema({
    type: {
        type: String,
        required: true,
        trim:true
    },
    city: {
        type: String,
        required: true,
        trim:true
    },
    address: {
        type: String,
        required: true,
        trim:true
    },
    size: {
        type: String,
        required: true,
        trim:true
    },
    price: {
        type: String,
        required: true,
        trim:true
    },
    bedrooms: {
        type: String,
        required: true,
        trim:true
    },
    bathrooms: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
        required:true
    },
    propertyImages:
        [
        
            {
                data: String,
                contentType: String,
                //  required:true
        }
    ],
    userMail: {
        type: String,
        trim: true,
        required:true
    },
    phone: {
        type: String,
        trim: true,
        required:true
    }

})

module.exports=mongoose.model('sellCollection', SellProperty)