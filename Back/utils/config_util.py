import os

class GlobalConfig:
    @staticmethod
    def get_log_path():
        return os.getenv('PATH_LOGGER_FILES')

    @staticmethod
    def get_log_filename():
        return os.getenv('LOG_FILENAME')