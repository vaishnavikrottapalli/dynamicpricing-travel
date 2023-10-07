const mongoose = require("mongoose")

const DaySchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    day:{
        type: String,
        required: true,
        unique: true
    },
    baseprice:{
        type: Number,
        required: true
    },
    bpUptoKm:{
        type: Number,
        required: true,
    },
    additionalprice:{
        type: Number,
        required: true,
    },
    tmf1:{
        type: Number,
        required: true,
    },
    tmf2:{
        type: Number,
        required: true,
    },
    tmf3:{
        type: Number,
        required: true,
    },
    waitcharge:{
        type: Number,
        required: true,
    },
},
{timestamps:true}  
);

module.exports = mongoose.model("Daydetail", DaySchema);