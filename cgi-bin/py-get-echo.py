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
    <title>GET Request Echo</title>
</head>
<body>
    <h1 align="center">Get Request Echo</h1>
    <hr>
""")

# Get the query string from the environment variable
query_string = os.environ.get("QUERY_STRING", "")

# Parse the query string
parsed_query_string = urllib.parse.parse_qs(query_string)

# Print out the query string
loop = 0
for key, value in parsed_query_string.items():
    loop += 1
    if loop % 2 != 0:
        print(key, "=", value[0], "<br/>")

# Print the HTML file bottom
print("</body></html>")
