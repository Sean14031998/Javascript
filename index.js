//modules
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { env } = require("process");
const nodemailer = require("nodemailer")

//app and port
const app = express();
const port = 3000;

//middleware
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:false}))

//set template options
app.set("view engine","pug");

//home route
app.get("/",(req,res)=>{
    res.render("index")
})
app.get("/about",(req,res)=>{
    res.render("about",{title:"Just some text"})
})
app.get("/services",(req,res)=>{
    res.render("services")
})
app.get("/contact",(req,res)=>{
    res.render("contact")
})

app.post('/contact/send',(req,res)=>{
    let transporter = nodemailer.createTransport({
        service:"Gmail",
        auth: {
        user: "seanp1846@gmail.com",
        pass: "14031998"
        }
    })

    let mailOptions = {
        from: "My Javacript Simple site",
        to:"seanp1846@gmail.com",
        subject:"Website Submission",
        Text:`You have a submission with the following details....Name : ${req.body.name} Email: ${req.body.email} Message: ${req.body.message}`,
        html:`<p>You have a submission with the following details</p> <ul><li>${req.body.name}</li><li>${req.body.email}</li><li>${req.body.message}</li></ul>`
    }
    transporter.sendMail(mailOptions,(err,info)=>{
        if(err){
            console.log(err)
            res.redirect("/")
        }else{
            console.log("Message sent"+info.response)
            res.redirect("/")
        }
    })
})

//listening to port
app.listen(port,()=>{
    console.log("Server Listening to port 3000...")
})