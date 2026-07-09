from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from app.core.config import settings

# ─── OLTP Akademik (PostgreSQL) ──────────────────────────
# Kita pakai engine PostgreSQL untuk semua
engine_oltp = create_engine(settings.OLTP_DATABASE_URL, pool_pre_ping=True)
SessionOLTP = sessionmaker(autocommit=False, autoflush=False, bind=engine_oltp)

# ─── OLTP SDM (PostgreSQL) ───────────────────────────────
engine_sdm = create_engine(settings.SDM_DATABASE_URL, pool_pre_ping=True)
SessionSDM = sessionmaker(autocommit=False, autoflush=False, bind=engine_sdm)

# ─── OLAP Warehouse (PostgreSQL) ─────────────────────────
engine_warehouse = create_engine(settings.WAREHOUSE_DATABASE_URL, pool_pre_ping=True)
SessionWarehouse = sessionmaker(autocommit=False, autoflush=False, bind=engine_warehouse)

class Base(DeclarativeBase):
    pass

# Dependency injectors 
def get_oltp_db():
    db = SessionOLTP()
    try:
        yield db
    finally:
        db.close()

def get_sdm_db():
    db = SessionSDM()
    try:
        yield db
    finally:
        db.close()

def get_warehouse_db():
    db = SessionWarehouse()
    try:
        yield db
    finally:
        db.close()