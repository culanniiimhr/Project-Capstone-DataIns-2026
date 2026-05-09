import os

# Secret key
SECRET_KEY = os.environ.get("SUPERSET_SECRET_KEY", "bikin-random-aja-yang-penting-rahasia")

# Koneksi ke PostgreSQL Data Warehouse 
# Format: postgresql+psycopg2://user:password@host:port/dbname
SQLALCHEMY_DATABASE_URI = "postgresql+psycopg2://warehouse_user:warehouse_secret@datains_warehouse:5432/db_warehouse"

# Konfigurasi Security & Proxy
SESSION_COOKIE_SAMESITE = "Lax"
ENABLE_PROXY_FIX = True
TALISMAN_ENABLED = False
WTF_CSRF_ENABLED = False 

# Feature flags untuk embedding
FEATURE_FLAGS = {
    "EMBEDDABLE_CHARTS": True,
    "EMBEDDED_SUPERSET": True,
}