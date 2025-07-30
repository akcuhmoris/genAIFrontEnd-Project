import os
import boto3
from dotenv import load_dotenv

load_dotenv()

s3 = boto3.client(
    's3',
    aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
    aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"],
    region_name=os.environ["AWS_REGION"]
)

bucket_name = os.environ["SECONDARY_BUCKET_NAME"]  # e.g., "my-portfolio-site"

# Upload the file
file_path = "output.html"
key = "index.html"  # must be index.html for static hosting

s3.upload_file(
    Filename=file_path,
    Bucket=bucket_name,
    Key=key,
    ExtraArgs={"ContentType": "text/html"}
)

print(f"✅ Uploaded '{file_path}' as '{key}' to bucket '{bucket_name}'")
