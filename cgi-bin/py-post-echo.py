#!/usr/bin/env python3
import os
import sys

# Print HTML header
print("Cache-Control: no-cache")
print("Content-type: text/html\n")
print("<html><head><title>POST Message Body</title></head>\
    <body><h1 align=center>POST Message Body</h1>\
    <hr/>\n")

# Get content length and read message body from stdin
content_length = int(os.environ.get("CONTENT_LENGTH", 0))
message_body = sys.stdin.read(content_length)
print("Message Body: " + message_body + "<br/>")

# Print HTML footer
print("</body>")
print("</html>")

