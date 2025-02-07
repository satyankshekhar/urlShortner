const mongoose = require('mongoose');

const url = "mongodb://127.0.0.1:27017";

const connectDb = () => {
    mongoose.connect(`${url}/urlDatabase`)
    .then(() => console.log("database connect ho gaya"))
    .catch((err) => console.log("error aa gaya, error hai:::  ", err));
}
module.exports = connectDb;