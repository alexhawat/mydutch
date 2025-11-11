"""Cloudflare R2 storage service for content and user data."""
from datetime import timedelta
from typing import Optional

import boto3
from botocore.client import Config
from botocore.exceptions import ClientError

from app.config import settings


class R2Service:
    """Service for interacting with Cloudflare R2 storage."""

    def __init__(self):
        """Initialize R2 client."""
        self.client = boto3.client(
            "s3",
            endpoint_url=settings.R2_ENDPOINT_URL,
            aws_access_key_id=settings.R2_ACCESS_KEY_ID,
            aws_secret_access_key=settings.R2_SECRET_ACCESS_KEY,
            config=Config(signature_version="s3v4"),
            region_name="auto",
        )
        self.content_bucket = settings.R2_CONTENT_BUCKET
        self.user_data_bucket = settings.R2_USER_DATA_BUCKET

    def upload_file(
        self, file_content: bytes, key: str, bucket: Optional[str] = None, content_type: str = "application/json"
    ) -> bool:
        """
        Upload a file to R2.

        Args:
            file_content: The file content as bytes
            key: The key (path) for the file in R2
            bucket: The bucket name (defaults to content bucket)
            content_type: The MIME type of the file

        Returns:
            True if successful, False otherwise
        """
        bucket = bucket or self.content_bucket
        try:
            self.client.put_object(
                Bucket=bucket,
                Key=key,
                Body=file_content,
                ContentType=content_type,
            )
            return True
        except ClientError as e:
            print(f"Error uploading file to R2: {e}")
            return False

    def get_file(self, key: str, bucket: Optional[str] = None) -> Optional[bytes]:
        """
        Download a file from R2.

        Args:
            key: The key (path) for the file in R2
            bucket: The bucket name (defaults to content bucket)

        Returns:
            File content as bytes, or None if error
        """
        bucket = bucket or self.content_bucket
        try:
            response = self.client.get_object(Bucket=bucket, Key=key)
            return response["Body"].read()
        except ClientError as e:
            print(f"Error downloading file from R2: {e}")
            return None

    def delete_file(self, key: str, bucket: Optional[str] = None) -> bool:
        """
        Delete a file from R2.

        Args:
            key: The key (path) for the file in R2
            bucket: The bucket name (defaults to content bucket)

        Returns:
            True if successful, False otherwise
        """
        bucket = bucket or self.content_bucket
        try:
            self.client.delete_object(Bucket=bucket, Key=key)
            return True
        except ClientError as e:
            print(f"Error deleting file from R2: {e}")
            return False

    def list_files(self, prefix: str = "", bucket: Optional[str] = None) -> list[str]:
        """
        List files in R2 bucket.

        Args:
            prefix: Filter files by prefix
            bucket: The bucket name (defaults to content bucket)

        Returns:
            List of file keys
        """
        bucket = bucket or self.content_bucket
        try:
            response = self.client.list_objects_v2(Bucket=bucket, Prefix=prefix)
            if "Contents" in response:
                return [obj["Key"] for obj in response["Contents"]]
            return []
        except ClientError as e:
            print(f"Error listing files from R2: {e}")
            return []

    def generate_presigned_url(
        self, key: str, bucket: Optional[str] = None, expiration: int = 3600
    ) -> Optional[str]:
        """
        Generate a presigned URL for accessing a private file.

        Args:
            key: The key (path) for the file in R2
            bucket: The bucket name (defaults to user data bucket)
            expiration: URL expiration time in seconds (default: 1 hour)

        Returns:
            Presigned URL string, or None if error
        """
        bucket = bucket or self.user_data_bucket
        try:
            url = self.client.generate_presigned_url(
                "get_object",
                Params={"Bucket": bucket, "Key": key},
                ExpiresIn=expiration,
            )
            return url
        except ClientError as e:
            print(f"Error generating presigned URL: {e}")
            return None

    def file_exists(self, key: str, bucket: Optional[str] = None) -> bool:
        """
        Check if a file exists in R2.

        Args:
            key: The key (path) for the file in R2
            bucket: The bucket name (defaults to content bucket)

        Returns:
            True if file exists, False otherwise
        """
        bucket = bucket or self.content_bucket
        try:
            self.client.head_object(Bucket=bucket, Key=key)
            return True
        except ClientError:
            return False


# Global R2 service instance
r2_service = R2Service()
