from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1.router import api_router

app = FastAPI(
    title="DataIns API",
    description="Backend API untuk Dashboard Satu Data Perguruan Tinggi",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(api_router, prefix="/api/v1")


@app.get("/")
def root():
    return {"message": "DataIns API is running 🚀", "version": "1.0.0"}


@app.get("/health")
def health_check():
    return {"status": "ok"}
