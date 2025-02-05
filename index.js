const express = require('express');
const mongoose = require('mongoose');
const shortId = require('shortid');
const fs = require('fs')
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//app.use(express.static(path.join(__dirname, 'public')));

const url = "mongodb://127.0.0.1:27017";

mongoose.connect(`${url}/urlDatabase`)
    .then(() => console.log("database connect ho gaya"))
    .catch((err) => console.log("error aa gaya, error hai:::  ", err));

const urlSchema = mongoose.Schema({
    redirectUrl: {
        type: String,
        unique: true,
        required: true
    },
    shortedUrl: {
        type: String,
        unique: true,
        required: true
    }
});

const urlModel = mongoose.model('ckn', urlSchema);


app.get('/',(req,res)=>{

    //console.log(fs.readFile("/index.html"))

    const filePath = path.join(__dirname,'index.html')

    fs.readFile(filePath,'utf-8',(err,data)=>{
        if(err)console.log("error hai")
        else res.send(data);
    })


    // fs.readFileSync('index.html','utf-8',(err,data)=>{
    //     if(err){
    //         console.log("is baar v nhi hua")
    //     }
    //     else res.send(data)
    // })
    //res.send("hello");

})

// app.get('/', (req, res) => {
//     const filePath = path.join(__dirname, 'index.html');
//     fs.readFile(filePath, 'utf8', (err, data) => {
//       if (err) {
//         console.error("Error reading index.html:", err);
//         return res.status(500).send("Internal Server Error");
//       }
//       res.send(data);
//     });
//   });


app.get('/url/:id', async (req, res) => {
    try {
        console.log(req.params.id);
        const result = await urlModel.findOne({ shortedUrl: req.params.id });
        console.log(result);
        if (result) {
            res.redirect(`https://${result.redirectUrl}`);
        } else {
            res.send("error hai dost");
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/url/', async (req, res) => {
    try {
        const redirectedUrl = req.body.redirectUrl;
        const shortedUrl = shortId.generate();

        const newUrl = await urlModel.create({
            redirectUrl: redirectedUrl,
            shortedUrl: shortedUrl
        });

        res.json(newUrl);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(3000, () => {
    console.log(`app is running on port: ${3000}`);
});