import os

# Secret key
SECRET_KEY = os.environ.get(
    "SUPERSET_SECRET_KEY",
    "bikin-random-aja-yang-penting-rahasia"
)

# Koneksi ke PostgreSQL Data Warehouse
SQLALCHEMY_DATABASE_URI = "postgresql+psycopg2://warehouse_user:warehouse_secret@datains_warehouse:5432/db_warehouse"

# Security & Proxy
SESSION_COOKIE_SAMESITE = "Lax"
ENABLE_PROXY_FIX = True
TALISMAN_ENABLED = False
WTF_CSRF_ENABLED = False

# Feature flags untuk embedding
FEATURE_FLAGS = {
    "EMBEDDABLE_CHARTS": True,
    "EMBEDDED_SUPERSET": True,
    "DASHBOARD_NATIVE_FILTERS": True,
    "ENABLE_TEMPLATE_PROCESSING": True,
}

# Guest token / embedded dashboard
GUEST_ROLE_NAME = "Gamma"

# CORS untuk React
ENABLE_CORS = True
CORS_OPTIONS = {
    "supports_credentials": True,
    "allow_headers": ["*"],
    "resources": ["*"],
    "origins": [
        "http://localhost:3001",
        "http://localhost:3000",
        "http://127.0.0.1:3001",
        "http://127.0.0.1:3000",
    ],
}