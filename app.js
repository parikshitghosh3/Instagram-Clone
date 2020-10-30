const express = require('express')
const app = express()
const port = 5000
const mongoose = require('mongoose')
const {mongouri} = require('./keys')


require('./models/user')

app.use(express.json())
app.use(require('./routes/auth'))


//mongoose.model("User")

mongoose.connect(mongouri,{
    useNewUrlParser:true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected',()=>{
    console.log("Connected to Mongo DB") 
})

mongoose.connection.on('error',(err)=>{
    console.log("error to Mongo DB",err)
})

/*
const customMiddleware= (req,res,next)=>{
    console.log("Middleware Executed!!!")
    next()
}

app.get('/home',(req,res)=>{
    console.log("Home")
    res.send("hello World")
})

app.get('/about',customMiddleware,(req,res)=>{
    console.log("About")
    res.send("About Page")
})
*/

app.listen(port,()=>{
    console.log("Server is running on ",port)
})