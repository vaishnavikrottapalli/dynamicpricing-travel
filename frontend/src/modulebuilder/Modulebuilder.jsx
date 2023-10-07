import React, { useState } from 'react';
import './modulebuilder.css';
import {Link} from 'react-router-dom';

export default function Modulebuilder() {

  const [formData, setFormData] = useState({
    uname: '',
    day: '',
    baseprice: '',
    bpUptoKm: '',
    additionalprice: '',
    tmf1: '',
    tmf2: '',
    tmf3: '',
    waitcharge: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    const price = calculatePrice(formData);    
    console.log('Calculated Price:', price);
  };

  const calculatePrice = (data) => {
    const { baseprice, bpUptoKm, additionalprice, tmf1, tmf2, tmf3, waitcharge } = data;

    const additionalDistance = parseFloat(bpUptoKm) - parseFloat(baseprice);
    const calculatedPrice = (parseFloat(baseprice) + additionalDistance * parseFloat(additionalprice)) +
      (additionalDistance <= 1 ? parseFloat(tmf1) :
        (additionalDistance <= 2 ? parseFloat(tmf2) : parseFloat(tmf3))) +
      parseFloat(waitcharge);

    return calculatedPrice;
  };

  return (
    <div className='module-page'>
      <header className='topbar'>
        <h2>Configure your Pricing Module</h2>
        <h3>You can now customize each day's Dynamic Pricing.</h3>
        <Link to="/pricecalculation">Price Calculator</Link>
      </header>
      <form className='formbox' onSubmit={handleSubmit}>
        <div className='day'>
          <h2>Day: </h2><br />
          <select id="day" name="day" onChange={handleInputChange}>
            <option value="monday">Monday</option>
            <option value="tuesday">Tuesday</option>
            <option value="wednesday">Wednesday</option>
            <option value="thursday">Thursday</option>
            <option value="friday">Friday</option>
            <option value="saturday">Saturday</option>
            <option value="sunday">Sunday</option>
          </select><br /><br />
          <label>Username:</label>
          <input type="text" id="uname" name="uname" onChange={handleInputChange} required />
        </div>
        <div className='DBP'>
          <h3>Distance Base Price (DBP)</h3><br />
          <label>Base Price:</label>
          <input type="text" name="baseprice" id="baseprice" onChange={handleInputChange} required />
          <label>upto</label>
          <input type="text" name="bpUptoKm" id="bpUptoKm" onChange={handleInputChange} required />km <br />
          <label>Additional Price per Km:</label>
          <input type="text" name="additionalprice" id="additionalprice" onChange={handleInputChange} required /><br /><br />
        </div>
        <div className='TMF'>
          <h3>Time Multiplier Factor (TMF)</h3><br />
          <label>TMF upto 1hr:</label>
          <input type="text" name="tmf1" onChange={handleInputChange} required /><br /><br />
          <label>TMF from 1hr - 2hr:</label>
          <input type="text" name="tmf2" onChange={handleInputChange} required /><br /><br />
          <label>TMF after 2hrs:</label>
          <input type="text" name="tmf3" onChange={handleInputChange} required /><br /><br />
        </div>
        <div className='WC'>
          <h3>Waiting Charges (WC)</h3>
          (no charges till 3 minutes) <br /><br />
          <label>Per minute charges:</label>
          <input type="text" name="waitcharge" id="waitcharge" onChange={handleInputChange} required /><br /><br /><br /><br />
        </div>
        <input type="submit" value="Submit Model" />
      </form>
    </div>
  );
}