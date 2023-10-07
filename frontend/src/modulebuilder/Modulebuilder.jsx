import React from 'react';
import './modulebuilder.css';

export default function Modulebuilder() {
  return (
    <div className='module-page'>
      <header className='topbar'>
        <h2>Configure your Pricing Module</h2>
        <h3>You can now customize each day's Dynamic Pricing.</h3>
      </header>
      <form className='formbox'>
        <div className='day'>
            <h2>Day: </h2><br />
            <select id="day">
                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="wednesday">Wednesday</option>
                <option value="thursday">Thursday</option>
                <option value="friday">Friday</option>
                <option value="saturday">Saturday</option>
                <option value="sunday">Sunday</option>
            </select><br /><br />
        </div>
        <div className='DBP'>
            <h3>Distance Base Price (DBP)</h3><br />        
            <label htmlFor="dbp">Base Price:</label>
            <input type="text" name="dbp" id="dbp" required />
            <label htmlFor="dbp">upto</label>
            <input type="text" name="dbp" id="dbp" required />
            <label htmlFor="dap">Additional Price per Km:</label>
            <input type="text" name="dap" id="dap" required /><br /><br />
        </div>
        <div className='TMF'>
            <h3>Time Multiplier Factor (TMF)</h3><br />
            <label>TMF upto 1Km:</label>
            <input type="text" required /><br /><br />
            <label>TMF from 1Km-2Km:</label>
            <input type="text" required /><br /><br />
            <label>TMF after 2Kms:</label>
            <input type="text" required /><br /><br />
        </div>
        <div className='WC'>
            <h3>Waiting Charges (WC)</h3><br />
            <label htmlFor="wc">Per minute chanrges:</label>
            <input type="text" name="wc" id="wc" required /><br /><br /><br /><br />
        </div>
        <input type="submit" value="Submit Model" />
      </form>
    </div>
  );
}
