# backend/app/core/config.py
from pydantic_settings import BaseSettings 
from typing import List

class Settings(BaseSettings):
    # JWT
    SECRET_KEY: str = "changeme"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 480

    # CORS
    BACKEND_CORS_ORIGINS: List[str] = ["http://localhost:3000"]

    # Ambil User & Password dari .env untuk OLTP bawaan
    POSTGRES_USER: str = "warehouse_user"
    POSTGRES_PASSWORD: str = "warehouse_secret"

    # PostgreSQL OLTP - Akademik
    DB_AKADEMIK_HOST: str = "datains_oltp"
    DB_AKADEMIK_PORT: int = 5432
    DB_AKADEMIK_DB: str = "db_akademik"

    # PostgreSQL SDM
    DB_SDM_HOST: str = "datains_sdm"
    DB_SDM_PORT: int = 5432
    DB_SDM_DB: str = "db_sdm"

    # PostgreSQL Warehouse (DISINKRONKAN DENGAN SUPABASE CLOUD .ENV)
    DB_WAREHOUSE_HOST: str = "aws-1-ap-southeast-1.pooler.supabase.com"
    DB_WAREHOUSE_PORT: int = 6543
    DB_WAREHOUSE_USER: str = "postgres.zuooajizxhtsxswdwcha"
    DB_WAREHOUSE_PASSWORD: str = "datains_secret3421"
    DB_WAREHOUSE_DB: str = "postgres"

    # AI & Service Lainnya
    OPENAI_API_KEY: str = ""
    SUPERSET_URL: str = "http://datains_superset:8088" # Sesuai file superset.py kamu kemarin

    # --- Properti URL (Otomatis ngerakit alamat DB) ---

    @property
    def OLTP_DATABASE_URL(self) -> str:
        return (
            f"postgresql+psycopg2://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}"
            f"@{self.DB_AKADEMIK_HOST}:{self.DB_AKADEMIK_PORT}/{self.DB_AKADEMIK_DB}"
        )

    @property
    def SDM_DATABASE_URL(self) -> str:
        return (
            f"postgresql+psycopg2://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}"
            f"@{self.DB_SDM_HOST}:{self.DB_SDM_PORT}/{self.DB_SDM_DB}"
        )

    @property
    def WAREHOUSE_DATABASE_URL(self) -> str:
        # Menggunakan kredensial khusus Warehouse (Supabase Cloud)
        return (
            f"postgresql+psycopg2://{self.DB_WAREHOUSE_USER}:{self.DB_WAREHOUSE_PASSWORD}"
            f"@{self.DB_WAREHOUSE_HOST}:{self.DB_WAREHOUSE_PORT}/{self.DB_WAREHOUSE_DB}"
        )

    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()