const router = require("express").Router();
const Daydetail = require("../models/Daydetail");

router.post("/postdaydetails", async (req, res) => {
    try {
    //   console.log("POST request received"+ req.body);
      const { username, day, baseprice, bpUptoKm, additionalprice, tmf1, tmf2, tmf3, waitcharge } = req.body;
      const existingDay = await Daydetail.findOne({ day });
  
      if (existingDay) {
        existingDay.username = username;
        existingDay.baseprice = baseprice;
        existingDay.bpUptoKm = bpUptoKm;
        existingDay.additionalprice = additionalprice;
        existingDay.tmf1 = tmf1;
        existingDay.tmf2 = tmf2;
        existingDay.tmf3 = tmf3;
        existingDay.waitcharge = waitcharge;
  
        const updatedDay = await existingDay.save();
        console.log("Updated!!");
        res.status(200).json(updatedDay);
      } else {
        const newDay = new Daydetail({
          username,
          day,
          baseprice,
          bpUptoKm,
          additionalprice,
          tmf1,
          tmf2,
          tmf3,
          waitcharge,
        });
        const dayd = await newDay.save();
        console.log("New day added", dayd);
        res.status(200).json(dayd);
      }
    } catch (err) {
      console.error("Error:", err);
      res.status(500).json(err);
    }
  });


// GET day details
router.get("/getdaydetails/:id", async(req,res)=>{
    try {
        console.log("get request received");
        const day = await Daydetail.findById(req.params.id);
        console.log(day)
        const { username, ...others} = day._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err)
    }
});


// GET all days in DB

router.get("/getdays", async(req,res)=>{
    try {
        console.log("get all days request received");
        const alldays = await Daydetail.find();
        console.log(alldays)
        res.status(200).json(alldays);
    } catch (err) {
        res.status(500).json(err)
    }
});
module.exports = router;