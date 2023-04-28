#!/usr/bin/env python3
import os
print("Cache-Control: no-cache")
print("Content-Type: text/html")

print()
print("<html><head><title>Python Environment Variables</title></head><body>")
for key, value in os.environ.items():
    print(f"<p><b>{key}</b>: {value}</p>")