"""
Load transformed DataFrames ke PostgreSQL Data Warehouse.
Strategi: append-only (incremental), tidak overwrite data historis.
"""

import pandas as pd
from sqlalchemy import create_engine
from config.db_config import WAREHOUSE_URL

# Mapping nama tabel target di warehouse
TABLE_MAP = {
    "akademik": {
        "fact_akademik": "fact_akademik",
        "dim_mahasiswa": "dim_mahasiswa",
        "dim_prodi": "dim_prodi",
        "dim_matakuliah": "dim_matakuliah",
    },
    "sdm": {
        "dim_dosen": "dim_dosen",
    },
}


def load_to_warehouse(data: dict[str, pd.DataFrame], domain: str):
    engine = create_engine(WAREHOUSE_URL)
    mapping = TABLE_MAP.get(domain, {})

    for key, table_name in mapping.items():
        if key not in data:
            print(f"[LOAD] Skip {key} - tidak ada di data transform")
            continue

        df = data[key]
        if df.empty:
            print(f"[LOAD] Skip {key} - DataFrame kosong")
            continue

        df.to_sql(
            name=table_name,
            con=engine,
            if_exists="append",   # append-only, tidak overwrite
            index=False,
            method="multi",
            chunksize=1000,
        )
        print(f"[LOAD] ✅ {table_name} → {len(df)} rows dimasukkan")
