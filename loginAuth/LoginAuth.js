const User=require('../models/form')
const bcrypt=require('bcrypt')

exports.LoginAuth = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    if (!Email || !Password) {
      return res.status(500).json({ message: "fill fields" });
    }

    // findone return promise that's why i use async await
    const CheckUser= await User.findOne({Email:Email}) 

    if(CheckUser){

        // check password for valid user if exit
        const PasswordCheck= await bcrypt.compare(Password,CheckUser.Password)

       

        
        if(PasswordCheck){
          // res.send({message:"User Exit"})
           // generte token for user auth
        // this function written in db model
        const token = await CheckUser.getAuthToken();
        //  console.log(token)
          res.json({success:true,CheckUser,token})
        }
        else{
          res.json({error:"User not exit"})
        }
        
        // res.json({message:"user verified"})
    }
    else{
        res.json({error:"Invalid User"})
    }

    
  } catch (error) {
    console.log(error);
  }
};
