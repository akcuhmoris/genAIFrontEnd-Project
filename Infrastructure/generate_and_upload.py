import os
import sys
import boto3
from google import genai
from dotenv import load_dotenv

# === Load environment variables ===
load_dotenv()

# === Validate CLI argument for prompt key ===
if len(sys.argv) < 2:
    print("❌ Usage: python generate_and_upload.py <s3_prompt_key>")
    sys.exit(1)

prompt_key = sys.argv[1]  # e.g., "prompts/user1.txt"

# === Initialize S3 client ===
s3 = boto3.client(
    's3',
    aws_access_key_id=os.environ.get("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.environ.get("AWS_SECRET_ACCESS_KEY"),
    region_name=os.environ.get("AWS_REGION")
)

primary_bucket = os.environ.get("BUCKET_NAME")          # S3 bucket where prompts are uploaded
static_bucket = os.environ.get("SECONDARY_BUCKET_NAME") # S3 bucket configured for static website

# === Step 1: Download prompt from S3 ===
try:
    response = s3.get_object(Bucket=primary_bucket, Key=prompt_key)
    file_content = response['Body'].read().decode('utf-8')
except Exception as e:
    print(f"❌ Error retrieving prompt from S3: {e}")
    sys.exit(1)

# === Step 2: Generate HTML using Gemini ===
try:
    api_key = os.environ.get("GEMINI_API_KEY")
    client = genai.Client(api_key=api_key)
    prompt = f"Analyze the following text and generate a static HTML website: {file_content}"
    gemini_response = client.models.generate_content(model="gemini-2.5-flash", contents=prompt)
    raw_html = gemini_response.text.strip()
except Exception as e:
    print(f"❌ Error generating content from Gemini: {e}")
    sys.exit(1)

# === Step 3: Clean up markdown-style code fences ===
if raw_html.startswith("```html"):
    raw_html = raw_html.lstrip("```html").rstrip("```").strip()
elif raw_html.startswith("```"):
    raw_html = raw_html.lstrip("```").rstrip("```").strip()

# === Step 4: Save HTML locally ===
try:
    with open("output.html", "w", encoding="utf-8") as f:
        f.write(raw_html)
except Exception as e:
    print(f"❌ Error saving HTML file: {e}")
    sys.exit(1)

# === Step 5: Upload HTML to static website S3 bucket ===
try:
    s3.upload_file(
        Filename="output.html",
        Bucket=static_bucket,
        Key="index.html",  # Optionally customize per user
        ExtraArgs={"ContentType": "text/html"}
    )
except Exception as e:
    print(f"❌ Error uploading HTML to S3: {e}")
    sys.exit(1)

# === Step 6: Print the website URL (stdout) ===
region = os.environ.get("AWS_REGION")
website_url = f"http://{static_bucket}.s3-website-{region}.amazonaws.com/index.html"
print(website_url)  # <- NestJS backend will capture this
