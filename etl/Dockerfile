FROM python:3.10-slim

WORKDIR /app

# Install basic dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Keep container running for background ETL processing
CMD ["tail", "-f", "/dev/null"]
