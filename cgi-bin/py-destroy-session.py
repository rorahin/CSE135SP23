#!/usr/bin/env python3

import os
import cgi
import cgitb
import shelve

cgitb.enable()


cookie_string = os.environ.get("HTTP_COOKIE")

if cookie_string:
    cookies = dict(x.strip().split('=', 1) for x in cookie_string.split(';') if '=' in x)
else:
    cookies = {}

session_id = cookies.get("session_id", None)

if session_id:
    session_file = 'sessions/' + session_id

    try:
        os.remove(session_file)
    except FileNotFoundError:
        pass
    print("Set-Cookie: session_id=; expires=Thu, 01 Jan 1970 00:00:00 GMT")

print("Content-Type: text/html")
print()

html = '''
<!DOCTYPE html>
<html>
<head>
    <title>Python Session Destroyed</title>
</head>
<body>
    <h1>Session Destroyed</h1>
    <a href="/py-cgiform.html">Back to the Python CGI Form</a><br />
    <a href="/cgi-bin/py-sessions-1.py">Back to Page 1</a><br />
    <a href="/cgi-bin/py-sessions-2.py">Back to Page 2</a>
</body>
</html>
'''

print(html)
