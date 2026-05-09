"""
Extract data dari OLTP SDM (MySQL db_sdm).
Mengambil: dosen, jabatan, prodi, fakultas.
"""

import pandas as pd
from sqlalchemy import create_engine
from config.db_config import SDM_URL


def extract_sdm() -> dict[str, pd.DataFrame]:
    engine = create_engine(SDM_URL)

    dosen = pd.read_sql("SELECT * FROM dosen", engine)
    jabatan = pd.read_sql("SELECT * FROM jabatan", engine)
    prodi = pd.read_sql("SELECT * FROM prodi", engine)
    fakultas = pd.read_sql("SELECT * FROM fakultas", engine)

    print(f"[EXTRACT SDM] dosen={len(dosen)}")

    return {
        "dosen": dosen,
        "jabatan": jabatan,
        "prodi": prodi,
        "fakultas": fakultas,
    }
