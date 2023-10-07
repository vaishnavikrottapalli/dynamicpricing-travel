const express = require("express");
const app = express();
const cors = require('cors');
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const dayRoute = require("./routes/daydetails");

dotenv.config();
const corsOptions = {
    origin: '*', // or specify your frontend URL like 'http://localhost:3000'
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  };
app.use(cors());
app.use(cors(corsOptions));
app.use(express.json());

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(console.log("connected to MongoDB"))
.catch((err) => console.log(err));

app.use("/day", dayRoute);

app.listen("5000",()=>{
    console.log("backend is running on 5000 port");
});