if(process.env.NODE_ENV !="production"){
    require('dotenv').config();
}


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session= require("express-session");
const MongoStore = require("connect-mongo");// ✅ For newer versions
const path = require("path");
const methodOverride = require("method-override");
const ejsMate= require("ejs-mate");
const flash= require("connect-flash");
const passport= require("passport");
const LocalStrategy = require("passport-local");
const User= require("./models/user.js");

const listingsRouter =require("./classrom/routes/listing.js");
const reviewRouter =require("./classrom/routes/review.js");
const userRouter =require("./classrom/routes/user.js"); 


// EJS & Middleware Setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"public")));




app.use(flash());







passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());






// app.get("/demouser" , async(req,res) =>{
//     let fakeUser= new User({
//         email:"student@gmail.com",
//         username:"student"
//     });

//    let registerUser=  await User.register(fakeUser,  "helloworld");
//    res.send(registerUser);
// });

// MongoDB Connection
  // const mongourl = "mongodb://127.0.0.1:27017/wanderlust";
    const dbUrl=process.env.ATLASDB_URL;


main().then(() => {
    console.log("connected to db");
}).catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(dbUrl);
}


const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
      secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600, // time period in seconds
  });

store.on("error",()=>{
    console.log("Error in mongo session store",err);
});

const sessionOption = {
    store,
    secret:  process.env.SECRET,
    resave: false,
    saveUninitialized: true, // ✅ Keep only this
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};

app.use(session(sessionOption));
app.use(passport.initialize());
app.use(passport.session());
// Add this *after* setting up `express-session` and `connect-flash`
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user; // Optional: to use `currentUser` in all EJS files
    next();
});




// Start Server
app.listen(8080, () => {
    console.log("port is listening");
});

app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewRouter )
app.use("/", userRouter);
//reviews

