import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import "./pricecalculation.css"

export default function Pricecalculation() {
    const [availableDays, setAvailableDays] = useState([]);
    const [selectedDay, setSelectedDay] = useState('');
    const [calculatedPrice, setCalculatedPrice] = useState(null);
    useEffect(() => {
        fetch("http://localhost:5000/day/getdays")
        .then((response) => response.json())
        .then((data) => {
          setAvailableDays(data)
          console.log(data)
        })
          .catch((error) => {console.error('Error fetching available days:', error)});
          
    }, []);

    const handleQuotePrice = () => {
        console.log("quote price is clicked",selectedDay);

        const selectedDayData = availableDays.find((day) => day.day === selectedDay);
        console.log("insede quote price, selected day data:",selectedDayData);
        
        if (selectedDayData) {
          const { baseprice, bpUptoKm, additionalprice, tmf1, tmf2, tmf3, waitcharge } = selectedDayData;
          let bp = baseprice, remdist = 0, dba, wc, tmf;
          const distance = parseFloat(document.getElementById('dist').value);
          let time = parseFloat(document.getElementById('time').value);
          let waittime = parseFloat(document.getElementById('wt').value);
      
          console.log("d and t are: ",distance, time, waittime);

          if (distance >= bpUptoKm){
            remdist = distance - bpUptoKm
          }
          dba = bp + (remdist*additionalprice);

          if(waittime > 3){
            waittime -= 3;
            wc = waittime * waitcharge;
          }

          const tiers = [
            { duration: 1, multiplier: tmf1 },   
            { duration: 1, multiplier: tmf2 }, 
          ];

          tmf = tiers.reduce((total, tier) => {
            const tierDuration = Math.min(tier.duration, time);
            total += bp * tier.multiplier * tierDuration;
            time -= tierDuration;
            return total;
          }, 0);
          if (time > 0) {
            tmf += bp * tmf3 * time;
          }
          let ans = tmf + dba + wc;
          setCalculatedPrice(ans);
        } else {
          setCalculatedPrice(null);
        }
      };
  return (
    <div>
        <header className='topbar'>
            <h2>Price Calculation</h2>
            <Link to="/">go to module building page</Link><br />
        </header>
        <form className = 'formbox' onSubmit={(e) => e.preventDefault()}>
            <select name="day" id="day" onChange={(e) => setSelectedDay(e.target.value)} required>
                <option value="">Select a day</option>
                {availableDays.map((day, index) => (
                    <option key={index} value={day.day}>
                    {day.day}
                    </option>
                ))}
            </select><br /><br />
            <label>Time in hours: </label>
            <input type="text" name="time" id="time" required /><br /><br />
            <label>wait time in minutes: </label>
            <input type="text" name="wt" id="wt" required /><br /><br />
            <label>Distance: </label>
            <input type="text" name="dist" id="dist" required /><br /><br />
            <input type="submit" value="Quote Price" onClick={handleQuotePrice} />
        </form><br />
        <br />
        {calculatedPrice !== null && (
        <div>
          <p className='ans'> Calculated Price: {calculatedPrice}</p>
        </div>
      )}
    </div>
  )
}
