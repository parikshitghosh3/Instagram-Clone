const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { jwt_secret } = require('../keys')
const requireLogin = require('../middleware/requireLogin')

router.get('/protected',requireLogin,(req,res)=>{
    res.send("Hello User")
})

// router.get('/',(req,res)=>{
//     res.send("Hello")
// })

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
        bcrypt.hash(password,12)
        .then(hashedpassword=>{
                const user = new User({
                    email,
                    password:hashedpassword,
                    name
                })
        
                user.save().then(user=>{
                    res.json({Message:"Saved Sucessfully"})
                })
                .catch(err=>{
                    console.log(err)
                })
            })
        .catch(err=>{
            console.log(err)
        })
    })
        
    
    //{res.json({Message:"Successfully psoted"})}
})

router.post('/signin',(req,res)=>{
    const {email,password}= req.body
    if (!email||!password)
    {
       return res.status(422).json({error:"Please add email and password"})
    }
    User.findOne({email:email}).then(savedUser=>{
        if (!savedUser){
            return res.status(422).json({error:"Invalid User"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if (doMatch){
                //res.json({Message:"Successfully Signed In"})
                //Generating a token for a successful login

                const token = jwt.sign({_id:savedUser._id},jwt_secret)
                res.json({token})
            }
            else{
                return res.status(422).json({error:"Invalid User"})
            }
        }).catch(err=>{
            console.log(err)
        })
    }).catch(err=>{
        console.log(err)
    })
})

module.exports = router 