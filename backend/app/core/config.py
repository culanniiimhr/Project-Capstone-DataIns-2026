# backend/app/core/config.py
from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List
from pathlib import Path


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=Path(__file__).resolve().parents[2] / ".env",
        case_sensitive=True,
        extra="ignore",
    )

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
    SUPERSET_URL: str = "http://datains_superset:8088"  # Sesuai file superset.py kamu kemarin

    # Supabase Auth
    SUPABASE_URL: str = ""
    SUPABASE_ANON_KEY: str = ""
    SUPABASE_SERVICE_ROLE_KEY: str = ""

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


settings = Settings()

# STEP 3/11 debug: confirm env loaded (presence/length, not secrets)
print(
    "[Config] Supabase loaded: SUPABASE_URL=",
    bool(settings.SUPABASE_URL),
    "len(SUPABASE_URL)=",
    len(settings.SUPABASE_URL or ""),
)
print(
    "[Config] Supabase loaded: SUPABASE_ANON_KEY=",
    bool(settings.SUPABASE_ANON_KEY),
    "len(SUPABASE_ANON_KEY)=",
    len(settings.SUPABASE_ANON_KEY or ""),
)
print(
    "[Config] Supabase loaded: SUPABASE_SERVICE_ROLE_KEY=",
    bool(settings.SUPABASE_SERVICE_ROLE_KEY),
    "len(SUPABASE_SERVICE_ROLE_KEY)=",
    len(settings.SUPABASE_SERVICE_ROLE_KEY or ""),
)

