from supabase import create_client

SUPABASE_URL = "https://zuooajizxhtsxswdwcha.supabase.co/rest/v1/users"
SUPABASE_SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1b29haml6eGh0c3hzd2R3Y2hhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTg5MzIzNSwiZXhwIjoyMDk3NDY5MjM1fQ.gUHih7ZtlKmayZyecnuPcS8Z6f2inI4Rlz8RT5Nq9kY"

supabase = create_client(
    SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY
)

users = [
    {
        "email": "gunawan@webmail.uad.ac.id",
        "password": "Rektor#2026",
        "nama": "Gunawan",
        "role": "ROLE_PIMPINAN",
    },
    {
        "email": "eva@webmail.uad.ac.id",
        "password": "UjmUAD#26",
        "nama": "Eva",
        "role": "ROLE_IKU",
    },
    {
        "email": "rahmat@webmail.uad.ac.id",
        "password": "Akademik#26",
        "nama": "Rahmat",
        "role": "ROLE_AKADEMIK",
    },
    {
        "email": "ika@webmail.uad.ac.id",
        "password": "SdmDosen#26",
        "nama": "Ika",
        "role": "ROLE_SDM",
    },
    {
        "email": "yusuf@webmail.uad.ac.id",
        "password": "AdminSys#26",
        "nama": "Yusuf",
        "role": "ROLE_ADMIN",
    },
]

for user in users:
    try:
        response = supabase.auth.admin.create_user(
            {
                "email": user["email"],
                "password": user["password"],
                "email_confirm": True,
                "user_metadata": {
                    "nama": user["nama"],
                    "role": user["role"],
                },
            }
        )

        print(f"✅ User {user['email']} berhasil dibuat")

    except Exception as e:
        print(f"❌ Gagal membuat {user['email']}")
        print(e)