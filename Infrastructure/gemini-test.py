import os
from google import genai
from dotenv import load_dotenv
import boto3

load_dotenv()

import boto3

s3 = boto3.client(
    's3',
    aws_access_key_id=os.environ.get("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.environ.get("AWS_SECRET_ACCESS_KEY"),
    region_name=os.environ.get("AWS_REGION")
)
bucket_name = os.environ.get("BUCKET_NAME")
key = 'prompts/first.txt' 

try:
    response = s3.get_object(Bucket=bucket_name, Key=key)
    file_content = response['Body'].read().decode('utf-8')
    print("File content retrieved from S3 successfully!")
except Exception as e:
    print(f"Error downloading file from S3: {e}")
    file_content = ""  

# Get the API key from the environment variable
api_key = os.environ.get("GEMINI_API_KEY")
aws_region = os.environ.get("AWS_REGION")

# Initialize the client with the API key
client = genai.Client(api_key=api_key)

prompt = f"Analyze the following text from S3 and summarize it: {file_content}"
response = client.models.generate_content(
    model="gemini-2.5-flash", contents=prompt
)

# Remove markdown code fences if present
raw_html = response.text.strip()

if raw_html.startswith("```html"):
    raw_html = raw_html.lstrip("```html").rstrip("```").strip()
elif raw_html.startswith("```"):
    raw_html = raw_html.lstrip("```").rstrip("```").strip()

# Save directly as the result
html_string = raw_html

# Write the HTML to a file
with open("output.html", "w") as f:
    f.write(html_string)

print("HTML file 'output.html' created successfully.")