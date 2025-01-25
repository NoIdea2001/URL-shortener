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
const allowedIPs = process.env.ALLOWIP
const mongoDBkey  = process.env.MONGO_KEY

connect(mongoDBkey)
.then(()=>{
    console.log("Connected to mongoDB");
})
.catch((err)=>{
    console.log(err);
})

app.set("view engine","ejs");
app.set("views",path.resolve("./views"))
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors({  
    origin: `${allowedIPs}`
})); 

app.use("/url",urlRoute);
app.use("/auth",authRoute);
app.use("/",staticRoute);

app.get('/test',async (req,res)=>{
    const allURLs = await URL.find({});
    return res.render('home', {urls: allURLs,});
});

app.get('/:shortId',async (req,res)=>{
    shortId = req.params.shortId;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    ip = ip.split(',')[0];
    const IPlookUp = await fetch(`http://ip-api.com/json/${ip}`).then((res) => res.json());
    const location = {
        city: IPlookUp?.city,
        region: IPlookUp?.regionName,
        country: IPlookUp?.country,
        zip: IPlookUp?.zip,
    };

    const entry = await URL.findOneAndUpdate({
        shortId
    },{
        $push: {
            visitHistory: {
                timestamp: Date.now(),
                ipaddress: ip,
                location: location,
            },
        },
    });
    if (!entry) {
         return res.render('notFound')
    }
    res.redirect(entry.redirectURL);
});




app.listen(PORT,()=>console.log(`Server Started at ${PORT}`))