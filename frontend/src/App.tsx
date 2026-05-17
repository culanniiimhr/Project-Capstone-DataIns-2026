import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardUtama from "./pages/DashboardUtama";
import DashboardAkademik from "./pages/DashboardAkademik";
import DashboardPimpinan from "./pages/DashboardPimpinan";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardUtama />} />
        <Route path="/akademik" element={<DashboardAkademik />} />
        <Route path="/pimpinan" element={<DashboardPimpinan />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
