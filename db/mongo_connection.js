const mongoose = require("mongoose");
const config = require("../config");

mongoose.connect(config.mongoDb.connectionStr)
    .then(()=>{
        console.log("Successfully connected to mongo database")
    })
    .catch((error)=>{
        console.log("Ha ocurrido un error", error)
    })
