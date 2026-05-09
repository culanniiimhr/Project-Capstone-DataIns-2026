from pydantic import BaseModel


class DashboardSummary(BaseModel):
    total_mahasiswa: int
    rata_ipk: float
    total_dosen: int
    tingkat_kelulusan: float
    capaian_iku: float
    tahun_akademik: str
    semester: str
