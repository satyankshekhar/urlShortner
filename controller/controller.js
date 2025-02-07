const urlModel = require('../models/url')
const userModel = require('../models/user')
const fs = require('fs')
const path = require('path');
const shortId = require('shortid');


const fileChalaDo = (req, res) => {
    const filePath = path.join(__dirname, '../view/index.html'); 

    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.log("error hai:", err);
            res.status(500).send("File read karne me error aayi");
        } else {
            res.send(data);
        }
    });

}

const redirectKarDo = async (req, res) => {
    try {
        console.log(req.params.id);
        const result = await urlModel.findOne({ shortedUrl: req.params.id });
        console.log(result);
        if (result) {
            res.redirect(`https://${result.redirectUrl}`);
        } else {
            res.send("ye short url mera generate kiya hua nahi hai...Database me nahi mila");
        }
    } catch (err) {
        res.status(500).send(err);
    }

}

const shortUrlCreateKardo = async (req, res) => {
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
}

const createUser = async (req,res)=>{
    const name1 = req.body.name;
    const password1 = req.body.password;
    const email1 = req.body.email;


    try {
        const newUser = await userModel.create({
            name: name1,
            email: email1,
            password: password1

        })
        console.log(newUser)
        res.send("response successfully submitted")

    } catch (err) {
        console.log("error hai", err)
        res.send("response submission failed")
    }

}
module.exports = {
    fileChalaDo,
    redirectKarDo,
    shortUrlCreateKardo,
    createUser
}