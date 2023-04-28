#!/usr/bin/env python3

import os
import urllib.parse

# Set the content type and disable caching
print("Content-type: text/html")
print("Cache-Control: no-cache")
print()

# Print the HTML file top
print("""<!DOCTYPE html>
<html>
<head>
    <title>POST Request Echo</title>
</head>
<body>
    <h1 align="center">POST Request Echo</h1>
    <hr>
""")

# Get the form data from the standard input
form_data = ""
content_length = int(os.environ.get("CONTENT_LENGTH", 0))
if content_length > 0:
    form_data = sys.stdin.read(content_length)

# Parse the form data
parsed_form_data = urllib.parse.parse_qs(form_data)

# Print out the form data
print("<b>Message Body:</b><br/>")
print("<ul>")
loop = 0
for key, value in parsed_form_data.items():
    loop += 1
    if loop % 2 != 0:
        print("<li>", key, "=", value[0], "</li>")
print("</ul>")

# Print the HTML file bottom
