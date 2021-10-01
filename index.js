const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3000;
const router = require('./moduls/router');

const fileupload = require('express-fileupload');

const app = express();

app.use(express.json());
app.use("/", router);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static'))); // Load frontPage 'index.html'

const start = () => {
    try {
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    }
    catch (e) {
        console.log(e);
    }
}

start();
