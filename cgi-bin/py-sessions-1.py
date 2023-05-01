#!/usr/bin/env python3

import os
import cgi
import cgitb
import uuid
import shelve

cgitb.enable()

cookie_string = os.environ.get("HTTP_COOKIE")
if cookie_string:
    cookie_list = [x.strip().split('=', 1) for x in cookie_string.split(';') if '=' in x]
    cookies = {key: value for key, value in cookie_list}
else:
    cookies = {}

session_id = cookies.get("session_id", None)

if session_id:
    session_file = '/var/www/CSE135SP23/cgi-bin/sessions/' + session_id
    with shelve.open(session_file) as session:
        username = session.get("username", None)
else:
    form = cgi.FieldStorage()
    username = form.getvalue("username")
    session_id = str(uuid.uuid4())
    session_file = '/var/www/CSE135SP23/cgi-bin/sessions/' + session_id


if username:
    with shelve.open(session_file) as session:
        session["username"] = username

    print(f"Set-Cookie: session_id={session_id}")

# Output headers and HTML
print("Content-type: text/html")
print()
print("""
<html>
<head>
<title>Python Sessions</title>
</head>
<body>

<h1>Python Sessions Page 1</h1>
""")

if username:
    print(f"<p><b>Name:</b> {username}")
else:
    print("<p><b>Name:</b> You do not have a name set</p>")
print("""
<br/><br/>
<a href="/cgi-bin/py-sessions-2.py">Session Page 2</a><br/>
<a href="/py-cgiform.html">Python CGI Form</a><br />
<form style="margin-top:30px" action="/cgi-bin/py-destroy-session.py" method="get">
<button type="submit">Destroy Session</button>
</form>

</body>
</html>
""")
