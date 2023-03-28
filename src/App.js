import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/header/Header";
import Standings from "./components/standings/Standings";
import TipsBuilder from "./components/tipsBuilder/TipsBuilder";
import Summary from "./components/tipsBuilder/Summary";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Standings />} />
        <Route path="/tipskupon" element={<TipsBuilder />} />
        <Route path="kvittering" element={<Summary />}/>
      </Routes>
    </Router>
  );
}

export default App;
