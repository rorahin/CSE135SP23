import sys

# Print HTML header
print("Cache-Control: no-cache")
print("Content-type: text/html\n")
print("<html><head><title>POST Message Body</title></head>\
    <body><h1 align=center>POST Message Body</h1>\
    <hr/>\n")

# Get message body from stdin
message_body = sys.stdin.read()
print("Message Body: " + message_body + "<br/>")

# Print HTML footer
print("</body>")
print("</html>")
