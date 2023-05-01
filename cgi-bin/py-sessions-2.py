#!/usr/bin/env python3

import os
import cgitb
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
    username = None



# Output headers and HTML
print("Content-Type: text/html\n")

print("""
<html>
<head>
<title>Python Sessions</title>
</head>
<body>

<h1>Python Sessions Page 2</h1>
""")

if username:
    print(f"<p><b>Name:</b> {username}")
else:
    print("<p><b>Name:</b> You do not have a name set</p>")
print("""
<br/><br/>
<a href="/cgi-bin/py-sessions-1.py">Session Page 1</a><br/>
<a href="/py-cgiform.html">Python CGI Form</a><br />
<form style="margin-top:30px" action="/cgi-bin/py-destroy-session.py" method="get">
<button type="submit">Destroy Session</button>
</form>

</body>
</html>
""")
