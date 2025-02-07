const express = require('express');
const urlRoutes = require('./routes/routes.js');
const connectDb = require('./database/db.js');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//app.use(express.static(path.join(__dirname, 'public')));

connectDb();

app.use('/',urlRoutes)

app.listen(3000, () => {
    console.log(`app is running on port: ${3000}`);
});