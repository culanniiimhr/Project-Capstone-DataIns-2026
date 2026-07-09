print("Program dimulai")

from supabase import create_client

print("Import berhasil")

SUPABASE_URL = "https://zuooajizxhtsxswdwcha.supabase.co"
SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1b29haml6eGh0c3hzd2R3Y2hhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4OTMyMzUsImV4cCI6MjA5NzQ2OTIzNX0.dVyq8_PpxS2bTw5b2duzwM5hbBEG8CtIkLHz3iFmVH4"

EMAIL = "yusuf@webmail.uad.ac.id"
PASSWORD = "AdminSys#26"

print("Membuat client...")

supabase = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)

print("Client berhasil dibuat")

try:
    response = supabase.auth.sign_in_with_password({
        "email": EMAIL,
        "password": PASSWORD
    })

    print("LOGIN BERHASIL")
    print(response)

except Exception as e:
    print("LOGIN GAGAL")
    print(e)