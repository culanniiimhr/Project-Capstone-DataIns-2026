"use client";

import { useEffect, useState } from "react";
import api from "../lib/api";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend,
} from "recharts";

interface Summary {
  total_mahasiswa: number;
  rata_ipk: number;
  total_dosen: number;
  tingkat_kelulusan: number;
  capaian_iku: number;
  tahun_akademik: string;
  semester: string;
}

const KPICard = ({
  label, value, unit = "", delta,
}: {
  label: string; value: string | number; unit?: string; delta?: string;
}) => (
  <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">{label}</p>
    <p className="text-3xl font-bold text-slate-800">
      {value}
      <span className="text-base font-normal text-slate-400 ml-1">{unit}</span>
    </p>
    {delta && <p className="text-xs text-emerald-600 mt-1">{delta}</p>}
  </div>
);

export default function DashboardPage() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [trenIPK, setTrenIPK] = useState([]);
  const [topProdi, setTopProdi] = useState([]);

  useEffect(() => {
    api.get("/dashboard/summary").then((r) => setSummary(r.data));
    api.get("/dashboard/tren-ipk").then((r) => setTrenIPK(r.data));
    api.get("/dashboard/top-prodi").then((r) => setTopProdi(r.data));
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Dashboard Pimpinan</h1>
        <p className="text-slate-500 text-sm">Ringkasan Kinerja Perguruan Tinggi</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard label="Total Mahasiswa" value={summary?.total_mahasiswa ?? "-"} />
        <KPICard label="Rata-rata IPK" value={summary?.rata_ipk ?? "-"} delta="+0.08 dari semester lalu" />
        <KPICard label="Dosen Aktif" value={summary?.total_dosen ?? "-"} />
        <KPICard label="Capaian IKU" value={summary?.capaian_iku ?? "-"} unit="%" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h2 className="font-semibold text-slate-700 mb-4">Tren IPK Per Semester</h2>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={trenIPK}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="semester" tick={{ fontSize: 12 }} />
              <YAxis domain={[2.5, 4]} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="rata_ipk" stroke="#2563eb" strokeWidth={2} dot />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h2 className="font-semibold text-slate-700 mb-4">Top 5 Prodi - Rata-rata IPK</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={topProdi} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis type="number" domain={[0, 4]} tick={{ fontSize: 12 }} />
              <YAxis dataKey="nama_prodi" type="category" tick={{ fontSize: 11 }} width={120} />
              <Tooltip />
              <Bar dataKey="rata_ipk" fill="#2563eb" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
