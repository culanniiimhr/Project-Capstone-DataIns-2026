import os

# Secret key
SECRET_KEY = os.environ.get(
    "SUPERSET_SECRET_KEY",
    "bikin-random-aja-yang-penting-rahasia"
)

# 🔥 FIX: Menggunakan SQLAlchemy URI dinamis dari .env (Supabase Cloud)
# Jika .env tidak terbaca, otomatis menggunakan URL Supabase lu sebagai fallback
SQLALCHEMY_DATABASE_URI = os.environ.get(
    "SUPERSET_DATABASE_URI",
    "postgresql+psycopg2://postgres.zuooajizxhtsxswdwcha:datains_secret3421@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres"
)

# Security & Proxy
SESSION_COOKIE_SAMESITE = "Lax"
ENABLE_PROXY_FIX = True
TALISMAN_ENABLED = False
WTF_CSRF_ENABLED = False

# Feature flags untuk embedding
FEATURE_FLAGS = {
    "EMBEDDABLE_CHARTS": True,
    "EMBEDDED_SUPERSET": True,
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