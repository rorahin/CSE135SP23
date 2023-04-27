#!/usr/bin/env python3
import os
import sys
import urllib.parse

print("Content-Type: text/plain")
print()

request_method = os.environ.get("REQUEST_METHOD", "GET")
content_length = int(os.environ.get("CONTENT_LENGTH", 0))

print(f"Request method: {request_method}")

if request_method == "POST":
    post_data = sys.stdin.read(content_length)
    params = urllib.parse.parse_qs(post_data)
elif request_method == "GET":
    query_string = os.environ.get("QUERY_STRING", "")
    params = urllib.parse.parse_qs(query_string)
else:
    params = {}

for key, values in params.items():
    for value in values:
        print(f"{key}: {value}")
