"""
Extract data dari OLTP Akademik (MySQL db_akademik).
Mengambil: mahasiswa, KRS, KHS, presensi, matakuliah.
"""

import pandas as pd
from sqlalchemy import create_engine
from config.db_config import OLTP_URL


def extract_akademik() -> dict[str, pd.DataFrame]:
    engine = create_engine(OLTP_URL)

    mahasiswa = pd.read_sql("SELECT * FROM mahasiswa", engine)
    krs = pd.read_sql("SELECT * FROM krs", engine)
    khs = pd.read_sql("SELECT * FROM khs", engine)
    presensi = pd.read_sql("SELECT * FROM presensi", engine)
    matakuliah = pd.read_sql("SELECT * FROM matakuliah", engine)
    prodi = pd.read_sql("SELECT * FROM prodi", engine)
    fakultas = pd.read_sql("SELECT * FROM fakultas", engine)

    print(f"[EXTRACT] mahasiswa={len(mahasiswa)}, khs={len(khs)}, presensi={len(presensi)}")

    return {
        "mahasiswa": mahasiswa,
        "krs": krs,
        "khs": khs,
        "presensi": presensi,
        "matakuliah": matakuliah,
        "prodi": prodi,
        "fakultas": fakultas,
    }
