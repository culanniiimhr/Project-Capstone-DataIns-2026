import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardUtama from "./pages/DashboardUtama";
import DashboardAkademik from "./pages/DashboardAkademik";
import DashboardPimpinan from "./pages/DashboardPimpinan";
// 1. TAMBAHIN IMPORT INI DI BAWAHNYA
import Login from "./pages/Login"; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardUtama />} />
        <Route path="/akademik" element={<DashboardAkademik />} />
        <Route path="/pimpinan" element={<DashboardPimpinan />} />
        {/* 2. TAMBAHIN ROUTE INI DI BAWAHNYA */}
        <Route path="/login" element={<Login />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;