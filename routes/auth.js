const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')

router.get('/',(req,res)=>{
    res.send("Hello")
})

router.post('/signup',(req,res)=>{
    const {name,email,password} = req.body
    if (!email || !password || !name){
       return res.status(422).json({error:"please add all the fields"})
    }
    else
    User.findOne({email:email}).then((saveUser)=>{
        if (saveUser){
            return res.status(422).json({error:"User already exists with that email"})
        }
         
        const user = new User({
            email,
            password,
            name
        })

        user.save().then(user=>{
            res.json({Message:"Saved Sucessfully"})
        })
        .catch(err=>{
            console.log(err)
        })
    }).catch(err=>{
        console.log(err)
    })
    
    //{res.json({Message:"Successfully psoted"})}
})

module.exports = router 