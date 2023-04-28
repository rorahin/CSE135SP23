#!/usr/bin/env python

import os
import cgi
import cgitb
import http.cookies
import tempfile
import pickle

# Enable CGI error reporting
cgitb.enable()

# Create a new Python Session
from http import cookies
from urllib.parse import urlparse
import uuid

session_directory = "/tmp"

# Create CGI Object
cgi_obj = cgi.FieldStorage()

# Get the Session ID from the Cookie
cookie = cookies.SimpleCookie(os.environ.get("HTTP_COOKIE"))
session_id = cookie["CGISESSID"].value if "CGISESSID" in cookie else None

# Load session data from file
session_path = os.path.join(session_directory, session_id)
with open(session_path, "rb") as f:
    session = pickle.load(f)

# Destroy the session
os.remove(session_path)

# Print HTML output
print("Content-Type: text/html")
print()

print("""<!DOCTYPE html>
<html>
<head>
    <title>Python Session Destroyed</title>
</head>
<body>
    <h1>Session Destroyed</h1>
    <a href="/python-cgiform.html">Back to the Python CGI Form</a><br/>
    <a href="/cgi-bin/python-sessions-1.py">Back to Page 1</a><br/>
    <a href="/cgi-bin/python-sessions-2.py">Back to Page 2</a>
</body>
</html>
""")
