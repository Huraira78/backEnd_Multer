const sellCollection = require('../models/SellPropertyModel')
const multer = require('multer')
const path=require('path')


// storage function

// const Storage = multer.diskStorage({
//     destination:"upload Images",
//     filename: (req,file, cb) => {
//         cb(null,Date.now() + '-' + path.extname(file.originalname))
//     }
// })

var Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        let fileName=Date.now()+'-'+file.originalname
        console.log(fileName)
        cb(null,fileName)
    }
});

const upload = multer({
    storage:Storage
}).array('sell')

const sellPropertyLogic =  (req, res) => {
  
    upload(req, res, (err) => {
        if (err) {
            console.log('Error from sell controller',err)
        }
        else {
            console.log("insideeeeee",req.files)
            const sellProperty = new sellCollection({
              type:req.body.type,
                city: req.body.city,
                address: req.body.address,
                size: req.body.size,
                price: req.body.price,
                bedrooms: req.body.bedrooms,
                bathrooms: req.body.bathrooms,
                description: req.body.description,
                propertyImages: {
                    data: req.files.path,
                    contentType:'image/png'
                },
                userMail: req.body.userMail,
                phone:req.body.phone
              
            })

            console.log("checking data",req.files[0].path)
            sellProperty.save(()=> {
                try {
                    console.log('property added successfully')
                } catch (error) {
                    console.log('Error',error)
                }
            })
            res.json(req.body)
            
        }
    })
       
    
    
}

module.exports=sellPropertyLogic