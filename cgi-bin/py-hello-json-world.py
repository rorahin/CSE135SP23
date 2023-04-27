#!/usr/bin/env python3
import os
import json
import datetime

data = {
    "message": "Hello World",
    "dateTime": str(datetime.datetime.now()),
    "userIP": os.environ.get("REMOTE_ADDR")
}

print("Content-Type: application/json")
print()
print(json.dumps(data))
