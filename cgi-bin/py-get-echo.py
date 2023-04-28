#!/usr/bin/env python3
import os

# Print HTML header
print("Cache-Control: no-cache")
print("Content-type: text/html\n")
print("<html><head><title>GET query string</title></head>\
    <body><h1 align=center>GET query string</h1>\
    <hr/>\n")

# Get and format query string
query_string = os.getenv("QUERY_STRING")
print("Raw query string: " + query_string + "<br/><br/>")
print("<table> Formatted Query String:")
query = query_string.split('&')
for p in query:
    var, val = p.split('=', 1) if '=' in p else (p, "<empty field>")
    print("<tr><td>%-8s:</td><td>%s</td></tr>\n" % (var, val))
print("</table>")

# Print closing HTML tags
print("</body>")
print("</html>")
