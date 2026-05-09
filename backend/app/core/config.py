from pydantic_settings import BaseSettings 
from typing import List

class Settings(BaseSettings):
    # JWT
    SECRET_KEY: str = "changeme"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 480

    # CORS
    BACKEND_CORS_ORIGINS: List[str] = ["http://localhost:3000"]

    # Ambil User & Password dari .env biar sinkron sama Docker
    POSTGRES_USER: str = "warehouse_user"
    POSTGRES_PASSWORD: str = "warehouse_secret"

    # PostgreSQL OLTP - Akademik
    POSTGRES_OLTP_HOST: str = "datains_oltp"
    POSTGRES_OLTP_PORT: int = 5432
    POSTGRES_OLTP_DB: str = "db_akademik"

    # PostgreSQL SDM
    POSTGRES_SDM_HOST: str = "datains_sdm"
    POSTGRES_SDM_PORT: int = 5432
    POSTGRES_SDM_DB: str = "db_sdm"

    # PostgreSQL Warehouse
    POSTGRES_HOST: str = "datains_warehouse"
    POSTGRES_PORT: int = 5432
    POSTGRES_DB: str = "db_warehouse"

    # AI
    OPENAI_API_KEY: str = ""

    # --- Properti URL (Otomatis ngerakit alamat DB) ---

    @property
    def OLTP_DATABASE_URL(self) -> str:
        return (
            f"postgresql+psycopg2://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}"
            f"@{self.POSTGRES_OLTP_HOST}:{self.POSTGRES_OLTP_PORT}/{self.POSTGRES_OLTP_DB}"
        )

    @property
    def SDM_DATABASE_URL(self) -> str:
        return (
            f"postgresql+psycopg2://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}"
            f"@{self.POSTGRES_SDM_HOST}:{self.POSTGRES_SDM_PORT}/{self.POSTGRES_SDM_DB}"
        )

    @property
    def WAREHOUSE_DATABASE_URL(self) -> str:
        return (
            f"postgresql+psycopg2://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}"
            f"@{self.POSTGRES_HOST}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"
        )

    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()