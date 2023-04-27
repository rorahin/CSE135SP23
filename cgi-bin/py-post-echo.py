#!/usr/bin/env python3
import os
import sys
import urllib.parse

print("Content-Type: text/plain")
print()

content_length = int(os.environ.get("CONTENT_LENGTH", 0))
post_data = sys.stdin.read(content_length)
params = urllib.parse.parse_qs(post_data)

for key, values in params.items():
    for value in values:
        print(f"{key}: {value}")
