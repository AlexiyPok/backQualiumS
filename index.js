const express = require('express');
const PORT = process.env.PORT || 3000;
const router = require('./moduls/router')



const app = express();

app.use(express.json());
app.use("/", router);
app.use(express.urlencoded({ extended: true }));


const start = () => {
    try {
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    }
    catch (e) {
        console.log(e);
    }
}

start();