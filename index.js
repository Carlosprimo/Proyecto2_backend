const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());

mongoose.connect(
    "___"
    )
.then(() => {
    console.log("Exito");
})
.catch((e) => {
    console.log("error: "+e)
})


app.listen(3000);