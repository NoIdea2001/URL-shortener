const express = require("express");
const path = require('path');
const connect = require("./connect");
const urlRoute = require('./routes/url');
const authRoute = require('./routes/authRouter')
const staticRoute = require('./routes/staticRouter')
const URL = require("./models/url")
const bodyParser = require('body-parser')
const cors = require('cors'); 
require('dotenv').config() 

const app = express();
const PORT = process.env.PORT

connect("mongodb+srv://saumyabhaintwal:saumya2004@cluster0.cddr5tl.mongodb.net/shortUrl?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("Connected to mongoDB");
})

app.set("view engine","ejs");
app.set("views",path.resolve("./views"))
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors({  
    origin: '*' // Allow requests from this origin  
})); 

app.use("/url",urlRoute);
app.use("/auth",authRoute);
app.use("/",staticRoute);

app.get('/test',async (req,res)=>{
    const allURLs = await URL.find({});
    return res.render('home', {urls: allURLs,});
});

app.get('/url/:shortId',async (req,res)=>{
    shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    },{
        $push: {
            visitHistory: {
                timestamp: Date.now()},
        },
    });
    if (!entry) {
         return res.render('notFound')
    }
    res.redirect(entry.redirectURL);
});




app.listen(PORT,()=>console.log(`Server Started at ${PORT}`))