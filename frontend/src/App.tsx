import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { FilterProvider } from "./context/FilterContext"; // 👇 Import provider lu di sini

import DashboardUtama from "./pages/DashboardUtama";
import DashboardAkademik from "./pages/DashboardAkademik";
import DashboardPimpinan from "./pages/DashboardPimpinan";
import DashboardIKU from "./pages/DashboardIKU";
import DashboardSistem from "./pages/DashboardSistem";
import Login from "./pages/Login"; 
import Profil from "./pages/Profil";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    // 🟢 Pembungkus Global: Menjamin semua halaman dashboard kebagian context filter tanpa crash useFilter
    <FilterProvider>
      <BrowserRouter>
        <Routes>
          {/* Halaman Utama / Landing */}
          <Route path="/" element={<DashboardUtama />} />
          
          {/* Rute Dashboard Utama (Prefix /dashboard) */}
          <Route path="/dashboard/utama" element={<DashboardUtama />} />
          <Route path="/dashboard/akademik" element={<DashboardAkademik />} />
          <Route path="/dashboard/pimpinan" element={<DashboardPimpinan />} />
          <Route path="/dashboard/iku" element={<DashboardIKU />} />
          <Route path="/dashboard/system" element={<DashboardSistem />} />
          
          {/* Fitur Pendukung */}
          <Route path="/login" element={<Login />} /> 
          <Route path="/profil" element={<Profil />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Auto-Redirect / Fallback: Menghindari Blank Putih pada rute parsial */}
          <Route path="/dashboard" element={<Navigate to="/dashboard/utama" replace />} />
          <Route path="/akademik" element={<Navigate to="/dashboard/akademik" replace />} />
          <Route path="/pimpinan" element={<Navigate to="/dashboard/pimpinan" replace />} />
        </Routes>
      </BrowserRouter>
    </FilterProvider>
  );
}

export default App;