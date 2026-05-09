"""
ETL Runner - Satu Data Perguruan Tinggi
Urutan: Extract → Transform → Load ke Data Warehouse

Cara pakai:
  python run_etl.py              # jalankan semua domain
  python run_etl.py --domain akademik
  python run_etl.py --domain sdm
"""

import argparse
import logging
from extractors.akademik_extractor import extract_akademik
from extractors.sdm_extractor import extract_sdm
from transformers.akademik_transformer import transform_akademik
from transformers.sdm_transformer import transform_sdm
from loaders.warehouse_loader import load_to_warehouse

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
)
log = logging.getLogger(__name__)


def run_akademik():
    log.info("=== ETL DOMAIN AKADEMIK ===")
    raw = extract_akademik()
    transformed = transform_akademik(raw)
    load_to_warehouse(transformed, domain="akademik")
    log.info("✅ Akademik selesai")


def run_sdm():
    log.info("=== ETL DOMAIN SDM ===")
    raw = extract_sdm()
    transformed = transform_sdm(raw)
    load_to_warehouse(transformed, domain="sdm")
    log.info("✅ SDM selesai")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--domain", choices=["akademik", "sdm", "all"], default="all")
    args = parser.parse_args()

    if args.domain in ("akademik", "all"):
        run_akademik()
    if args.domain in ("sdm", "all"):
        run_sdm()

    log.info("🎉 ETL selesai semua")
