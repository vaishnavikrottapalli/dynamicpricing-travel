const router = require("express").Router();
const Daydetail = require("../models/Daydetail");

router.post("/daydetails", async(req,res)=>{
    try {
        const { username, day, baseprice, bpUptoKm, additionalprice, tmf1, tmf2, tmf3, waitcharge } = req.body;
        const existingDay = await Daydetail.findOne({ day });

        if(existingDay){
            existingDay.username = username;
            existingDay.baseprice = baseprice;
            existingDay.bpUptoKm = bpUptoKm;
            existingDay.additionalprice = additionalprice;
            existingDay.tmf1 = tmf1;
            existingDay.tmf2 = tmf2;
            existingDay.tmf3 = tmf3;
            existingDay.waitcharge = waitcharge;

            const updatedDay = await existingDay.save();
            console.log("updated!!")
            res.status(200).json(updatedDay);
        } else{
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
            })
            const dayd = await newDay.save();
            console.log("dayd", dayd);
            res.status(200).json(dayd);
        }      
        
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
});

module.exports = router;