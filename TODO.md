# Auth Debug & Fix TODO

- [x] Update `frontend/src/pages/Login.tsx` to call backend `POST /api/v1/auth/login` with `{ email, password }` and remove dummy localStorage auth.

- [ ] Update `backend/app/api/v1/endpoints/auth.py`:
  - [ ] Add temporary debug logs (incoming email, password length, Supabase URL, full Supabase response).
  - [ ] Bubble up exact Supabase error reason (400/401/422) instead of always returning "Email atau password salah".

- [ ] Update `backend/app/core/config.py` to print whether `SUPABASE_URL` and keys are loaded (presence/length, not secrets).

- [ ] Run backend/test login checks (python/curl) to confirm behavior.

- [ ] Verify frontend login now shows real backend/Supabase error.

