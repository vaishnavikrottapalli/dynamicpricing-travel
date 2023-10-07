import Modulebuilder from "./modulebuilder/Modulebuilder";
import Pricecalculation from "./pricepage/Pricecalculation";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Modulebuilder/>} />
        <Route path="/pricecalculation" element={<Pricecalculation />} />
      </Routes>
    </Router>
  )
}

export default App;
