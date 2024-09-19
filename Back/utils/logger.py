import os
import logging
from utils.config_util import GlobalConfig


def setup_logger(log_file_path):
    # Ensure the directory exists
    log_dir = os.path.dirname(log_file_path)
    os.makedirs(log_dir, exist_ok=True)

    # Set up logging
    file_handler = logging.FileHandler(log_file_path)
    formatter = logging.Formatter("%(asctime)s - %(levelname)s - %(message)s")
    file_handler.setFormatter(formatter)

    logger = logging.getLogger("query")
    logger.addHandler(file_handler)
    logger.setLevel(logging.INFO)

    return logger

log_filename = GlobalConfig.get_log_filename()
logger = setup_logger(log_filename)
