const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')


const Formdata =mongoose.Schema({
    Name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:50,
        trim:true
    },
    Email:{
        type: String,
        required:true,  
        trim:true,
        unique:true
    },
    // Number:{
    //     type:String,
    //     required:true
    // },
    Password:{
        type:String,
        required:true,
        minlength:8
    },
    UserTokens:[
        {
            userToken:{
                type:String,
                required:true
            }
        }
       
    ],
    Date:{
        type:Date,
        default:Date.now
    }
})

// this to generate user auth token

Formdata.methods.getAuthToken= async function(){
    try {
        const token= jwt.sign({_id:this._id},process.env.SECRET_KEY,{
            expiresIn:'1d'
        })
        
        this.UserTokens=this.UserTokens.concat({userToken:token})
        await this.save()
        return token
        
    } catch (error) {
        res.send(error)
    }
}

module.exports=mongoose.model('User', Formdata)