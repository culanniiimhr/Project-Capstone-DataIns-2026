from supabase import Client, create_client

from app.core.config import settings


# Singleton Supabase Client
_supabase: Client | None = None


def get_supabase_client() -> Client:
    """
    Return Supabase client instance.
    Client dibuat sekali (singleton) agar tidak membuat koneksi baru
    setiap request.
    """
    global _supabase

    if _supabase is None:
        _supabase = create_client(
            settings.SUPABASE_URL,
            settings.SUPABASE_ANON_KEY,
        )

    return _supabase


def get_service_client() -> Client:
    """
    Service Role Client.

    Digunakan hanya untuk operasi backend seperti:
    - mengambil data user
    - membaca role
    - operasi admin

    Jangan pernah dikirim ke frontend.
    """
    return create_client(
        settings.SUPABASE_URL,
        settings.SUPABASE_SERVICE_ROLE_KEY,
    )