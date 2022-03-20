import os

AWS_ACCESS_KEY_ID = os.environ.get("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.environ.get("AWS_SECRET_ACCESS_KEY")
AWS_STORAGE_BUCKET_NAME = os.environ.get("AWS_STORAGE_BUCKET_NAME")
# To be filled in production
AWS_S3_ENDPOINT_URL = ""
AWS_S3_OBJECT_PARAMETERS  = {
    "CacheControl": "max-age=86400",
}
# To be filled in production
AWS_LOCATION  = ""
DEFAULT_FILE_STORAGE  = "core.cdn.backends.MediaRootS3Boto3Storage"
STATICFILES_STORAGE  = "core.cdn.backends.StaticRootS3Boto3Storage"