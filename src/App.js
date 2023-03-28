import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/header/Header";
import Standings from "./components/standings/Standings";
import TipsBuilder from "./components/tipsBuilder/TipsBuilder";
import Summary from "./components/tipsBuilder/Summary";
import NotFound from "./components/NotFound/NotFound";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Standings />} />
        <Route path="/tipskupon" element={<TipsBuilder />} />
        <Route path="kvittering" element={<Summary />}/>
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </Router>
  );
}

export default App;
