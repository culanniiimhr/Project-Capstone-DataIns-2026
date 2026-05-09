"""
Transform data akademik → siap masuk data warehouse (star schema).
Cleaning, standardisasi, agregasi, mapping ke fact & dim tables.
"""

import pandas as pd


def transform_akademik(raw: dict[str, pd.DataFrame]) -> dict[str, pd.DataFrame]:
    mahasiswa = _clean_mahasiswa(raw["mahasiswa"])
    khs = _clean_khs(raw["khs"])
    presensi = _clean_presensi(raw["presensi"])
    matakuliah = raw["matakuliah"].drop_duplicates(subset="kode_matakuliah")
    prodi = raw["prodi"].drop_duplicates(subset="id_prodi")

    # Fact Akademik: gabung KHS + mahasiswa + prodi
    fact = khs.merge(mahasiswa[["nim", "id_prodi", "angkatan"]], on="nim", how="left")
    fact = fact.merge(matakuliah[["kode_matakuliah", "sks"]], on="kode_matakuliah", how="left")

    # Agregasi presensi per nim per matkul
    agg_presensi = (
        presensi.groupby(["nim", "kode_matakuliah"])
        .apply(lambda g: round((g["status_kehadiran"] == "Hadir").sum() / len(g) * 100, 2))
        .reset_index(name="pct_kehadiran")
    )
    fact = fact.merge(agg_presensi, on=["nim", "kode_matakuliah"], how="left")

    print(f"[TRANSFORM] fact_akademik rows: {len(fact)}")

    return {
        "fact_akademik": fact,
        "dim_mahasiswa": mahasiswa,
        "dim_prodi": prodi,
        "dim_matakuliah": matakuliah,
    }


def _clean_mahasiswa(df: pd.DataFrame) -> pd.DataFrame:
    df = df.drop_duplicates(subset="nim")
    df["status_mahasiswa"] = df["status_mahasiswa"].str.strip().str.title()
    df["angkatan"] = pd.to_numeric(df["angkatan"], errors="coerce").fillna(0).astype(int)
    return df


def _clean_khs(df: pd.DataFrame) -> pd.DataFrame:
    df = df.drop_duplicates(subset=["nim", "kode_matakuliah", "semester"])
    df["nilai_angka"] = pd.to_numeric(df["nilai_angka"], errors="coerce")
    # Hapus nilai anomali
    df = df[(df["nilai_angka"] >= 0) & (df["nilai_angka"] <= 4)]
    df["nilai_huruf"] = df["nilai_huruf"].str.upper().str.strip()
    return df


def _clean_presensi(df: pd.DataFrame) -> pd.DataFrame:
    df = df.drop_duplicates()
    df["tanggal"] = pd.to_datetime(df["tanggal"], errors="coerce")
    df["status_kehadiran"] = df["status_kehadiran"].str.strip().str.title()
    df = df[df["status_kehadiran"].isin(["Hadir", "Tidak Hadir", "Izin", "Sakit"])]
    return df
