FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    default-libmysqlclient-dev \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

# ➕ Upgrade pip terlebih dahulu untuk menghindari error wheel pydantic-core
RUN pip install --no-cache-dir --upgrade pip

# Jalankan install requirements seperti biasa
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000