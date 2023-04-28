#!/usr/bin/env python

import os
import sys

# Set the content type and disable caching
print("Content-type: text/html")
print("Cache-Control: no-cache")
print()

# Print the HTML file top
print("""<!DOCTYPE html>
<html>
<head>
    <title>General Request Echo</title>
</head>
<body>
    <h1 align="center">General Request Echo</h1>
    <hr>
""")

# Print HTTP Protocol, HTTP Method, and the Query String
print("<p><b>HTTP Protocol:</b>", os.environ["SERVER_PROTOCOL"], "</p>")
print("<p><b>HTTP Method:</b>", os.environ["REQUEST_METHOD"], "</p>")
print("<p><b>Query String:</b>", os.environ["QUERY_STRING"], "</p>")

# Get the form data from the standard input
form_data = ""
content_length = int(os.environ.get("CONTENT_LENGTH", 0))
if content_length > 0:
    form_data = sys.stdin.read(content_length)

# Print the message body
print("<p><b>Message Body:</b>", form_data, "</p>")

# Print the HTML file bottom
print("</body></html>")
