const express=require("express");
const app= express();
const session= require("express-session");



const sessionOption={secret: "mysupersecretstring" ,  
        resave:false , 
        saveUninitialized: true
    };


app.use(session(sessionOption));

app.get("/register", (req,res)=>{
    
});

app.listen(3000, ()=>{
    console.log("session is listening");
});




