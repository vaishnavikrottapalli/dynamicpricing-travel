const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const dayRoute = require("./routes/daydetails");

dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(console.log("connected to MongoDB"))
.catch((err) => console.log(err));

app.use("/api/day", dayRoute);

app.listen("5000",()=>{
    console.log("backend is running on 5000 port");
});