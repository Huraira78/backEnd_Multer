const FormDaTa=require('../models/form.js')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')

const logic= async (req,res)=>{
    const generateSalt= await bcrypt.genSalt(10)
    const bcryptPassword=await bcrypt.hash(req.body.Password, generateSalt)
    const registration=new FormDaTa({
        Name:req.body.Name,
        Email:req.body.Email,
        // Number:req.body.Number,
        // Password:req.body.Password
        Password:bcryptPassword
    })
    let transporter = nodemailer.createTransport({
        host:"smtp.ethereal.email",
        port: 587,
        service: "gmail",
        secure: false, // true for 465, false for other ports
        auth: {
          user: "", // generated ethereal user
          pass: "", // generated ethereal password
        },
      });
    
      const mailOptions = {
        from: "",
        to: [registration.Email],
        subject: "User Data",
          html: `
                <h3>welcome ${registration.Name} To E-Property App</h3>
                <h5>your conut is created succesfully wiht these credendials listed below: </h5>
            <h2>Name ${registration.Name}</h2>
            <h2>Email ${registration.Email}</h2>
            `,
      };
      transporter.sendMail(mailOptions, (err, res) => {
        if (err) console.log(err);
      });
    
    registration.save(()=>{
        try {
            console.log('user added successfully')
        } catch (error) {
            console.log('Error')
        }
    })
    res.send(req.body)

    // res.send('done');
}
module.exports=logic