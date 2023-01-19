const express = require("express");
const app  = express();
const database = require("./config/db")
const cookie_parser = require("cookie-parser");
const bodyParser = require("body-parser");

app.use(express.json());
app.use(cookie_parser())
app.use(bodyParser.urlencoded({ extended: true }))

require("dotenv").config();
app.get('/', (req, res) => {
    res.send('welcome');
  });

const userRoute = require("./routes/index");

app.use("/api/v1",userRoute);

const PORT = process.env.PORT || 4000;

app.listen(PORT,async(req,res)=>{
    try{
        
        await database();
        console.log(`app is running on http://localhost:${process.env.PORT}`)
    }
    catch(err){
        return res.status(500).send({message:err.message});
    }
})
