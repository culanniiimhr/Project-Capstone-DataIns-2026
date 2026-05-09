import os
from dotenv import load_dotenv

load_dotenv()

OLTP_URL = (
    f"mysql+pymysql://{os.getenv('MYSQL_OLTP_USER')}:{os.getenv('MYSQL_OLTP_PASSWORD')}"
    f"@{os.getenv('MYSQL_OLTP_HOST')}:{os.getenv('MYSQL_OLTP_PORT', 3306)}"
    f"/{os.getenv('MYSQL_OLTP_DB')}"
)

SDM_URL = (
    f"mysql+pymysql://{os.getenv('MYSQL_SDM_USER')}:{os.getenv('MYSQL_SDM_PASSWORD')}"
    f"@{os.getenv('MYSQL_SDM_HOST')}:{os.getenv('MYSQL_SDM_PORT', 3306)}"
    f"/{os.getenv('MYSQL_SDM_DB')}"
)

WAREHOUSE_URL = (
    f"postgresql+psycopg2://{os.getenv('POSTGRES_USER')}:{os.getenv('POSTGRES_PASSWORD')}"
    f"@{os.getenv('POSTGRES_HOST')}:{os.getenv('POSTGRES_PORT', 5432)}"
    f"/{os.getenv('POSTGRES_DB')}"
)
