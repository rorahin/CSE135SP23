#!/usr/bin/env python3

import os
import cgi
import cgitb
import http.cookies
import tempfile

# Enable CGI error reporting
cgitb.enable()

# Create a new Python Session
from http import cookies
from urllib.parse import urlparse
import uuid
import pickle

session_directory = "/tmp"
session_id = str(uuid.uuid4())
session_path = os.path.join(session_directory, session_id)
session = {}

# Create CGI Object
cgi_obj = cgi.FieldStorage()

# Create a new Cookie from the Session ID
cookie = cookies.SimpleCookie()
cookie["CGISESSID"] = session_id
print(cookie)

# Store Data in that Python Session
name = session.get("username") or cgi_obj.getvalue("username")
session["username"] = name

# Save session data to file
with open(session_path, "wb") as f:
    pickle.dump(session, f)

# Print HTML output
print("Content-Type: text/html")
print()

print("""<!DOCTYPE html>
<html>
<head>
    <title>Python Sessions</title>
</head>
<body>
    <h1>Python Sessions Page 1</h1>
""")

if name:
    print("<p><b>Name:</b>", name, "</p>")
else:
    print("<p><b>Name:</b> You do not have a name set</p>")
print("<br/><br/>")
print('<a href="/cgi-bin/py-sessions-2.py">Session Page 2</a><br/>')
print('<a href="/python-cgiform.html">Python CGI Form</a><br/>')
print('<form style="margin-top:30px" action="/cgi-bin/py-destroy-session.py" method="get">')
print('<button type="submit">Destroy Session</button>')
print('</form>')
print("</body>")
print("</html>")

