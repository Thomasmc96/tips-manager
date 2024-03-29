import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/admin/ProtectedRoute";

import Header from "./components/header/Header";
import Standings from "./components/standings/Standings";
import TipsBuilder from "./components/tipsBuilder/TipsBuilder";
import Prize from "./components/prize/Prize";
import Summary from "./components/tipsBuilder/Summary";
import Login from "./components/login/Login";
import NotFound from "./components/notFound/NotFound";

// Admin routes
import Overview from "./components/admin/Overview";
import Matches from "./components/admin/Matches";
import EditMatch from "./components/admin/EditMatch";
import Email from "./components/admin/Email";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/tilmeldinger" element={
          <ProtectedRoute>
            <Overview />
          </ProtectedRoute>
        } />
        <Route path="/kampe" element={
          <ProtectedRoute>
            <Matches />
          </ProtectedRoute>
        } />
        <Route path="/kampe/:id" element={
          <ProtectedRoute>
            <EditMatch />
          </ProtectedRoute>
        } />
        <Route path="/email" element={
          <ProtectedRoute>
            <Email />
          </ProtectedRoute>
        } />
        <Route path="/" element={<Standings />} />
        <Route path="/tipskupon" element={<TipsBuilder />} />
        <Route path="/praemie" element={<Prize />} />
        <Route path="kvittering" element={<Summary />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
