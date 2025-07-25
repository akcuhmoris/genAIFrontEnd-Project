import os
from google import genai
from dotenv import load_dotenv

load_dotenv()

# Get the API key from the environment variable
api_key = os.environ.get("GEMINI_API_KEY")

# Initialize the client with the API key
client = genai.Client(api_key=api_key)

# Get the response from the Gemini API
response = client.models.generate_content(
    model="gemini-2.5-flash", contents="Make me a personal html website with made up projects and activities for a software engineerign personal website"
)

# Capture the response text
html_content = response.text

# Create the HTML structure
html_string = f"""
<!DOCTYPE html>
<html>
<head>
    <title>Gemini Generated HTML</title>
</head>
<body>
    {html_content}
</body>
</html>
"""

# Write the HTML to a file
with open("output.html", "w") as f:
    f.write(html_string)

print("HTML file 'output.html' created successfully.")