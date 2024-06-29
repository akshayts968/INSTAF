const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const path = require("path");
const MONGO_URL = "mongodb://127.0.0.1:27017/temperary";
const passport=require("passport");
const LocalStrategy=require("passport-local");
const flash = require("connect-flash")
const bodyParser = require("body-parser");
const multer = require('multer');
const upload = multer({ dest: "uploads/" });
const Post = require("./model/Post.js");
const User = require("./model/User.js");
const cors = require('cors');
const sessionOptions = {
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};
app.use(bodyParser.json());
app.use(session(sessionOptions));
app.use(flash());
const corsOptions = {
    origin: 'http://localhost:3000', // Replace with your frontend's origin
    credentials: true, // Allow cookies for cross-origin requests
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
  };
  app.use(cors(corsOptions));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(express.urlencoded({ extended: true }));
//app.use(methodOverride("_method"));

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});
main().then(() => {
    console.log("conntected to DB");
})
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
};

app.get("/post/:id",async(req,res)=>{
    try {
        const id =req.params.id;
        const user = await User.findById(id);
        const data = await User.findById(id).populate("post");
        res.json({data:data.post,User:user});
        //res.send(data);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
});
app.get('/sresult', async(req, res) => {
    const query = req.query.query;
    //console.log(query)
    const result = await User.find(
        { username: { $regex: query, $options: 'i' } }, 
        { _id: 1, username: 1, profile: 1, name: 1 }    
      );
    //console.log("rrr",result)
    res.json(result);
  });
app.post("/login",passport.authenticate("local",{
    failureFlash:true,}),(req,res)=>{
        //console.log('User logged in:', req.user); // Access authenticated user data
  res.send({ message: 'Login successful!', user: req.user });
});
/*app.all("*",(req,res)=>{
    res.send("WELCOME");
});*/
app.listen(8080, () => {
    console.log("server is listening to port 8080");
});