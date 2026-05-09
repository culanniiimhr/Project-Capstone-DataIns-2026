"""Transform data SDM → dim_dosen untuk warehouse."""

import pandas as pd


def transform_sdm(raw: dict[str, pd.DataFrame]) -> dict[str, pd.DataFrame]:
    dosen = raw["dosen"].copy()
    jabatan = raw["jabatan"].copy()

    dosen = dosen.drop_duplicates(subset="nidn")
    dosen["status_kepegawaian"] = dosen["status_kepegawaian"].str.strip().str.title()

    # Gabung jabatan
    dim_dosen = dosen.merge(jabatan[["id_jabatan", "nama_jabatan"]], on="id_jabatan", how="left")

    print(f"[TRANSFORM SDM] dim_dosen rows: {len(dim_dosen)}")

    return {"dim_dosen": dim_dosen}
