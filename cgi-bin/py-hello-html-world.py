#!/usr/bin/env python3
import os
import datetime

print("Content-Type: text/html")
print()

html = f"""
<!DOCTYPE html>
<html>
<head>
    <title>Hello HTML World</title>
</head>
<body>
    <h1>Hello World</h1>
    <p>Date/Time: {datetime.datetime.now()}</p>
    <p>User IP: {os.environ.get("REMOTE_ADDR")}</p>
</body>
</html>
"""

print(html)