#!/usr/bin/env python3
import os
print("Cache-Control: no-cache")
print("Content-Type: text/html")

print()
print ("<h1 align='center'>Environment Variables</h1><hr />")
for key, value in os.environ.items():
    print("<b>", key, ":</b>", value, "<br />")
