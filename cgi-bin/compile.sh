#!/bin/bash

# Compile all .c files in the current directory
for file in *.c; do
  gcc "$file" -o "${file%.c}.cgi"
done
