#!/usr/bin/env rustc

use std::env;
use std::io::{self, BufRead};

fn main() -> io::Result<()> {
    // Print HTTP headers
    println!("Cache-Control: no-cache");
    println!("Content-type: text/html\n");

    println!("<html>");
    println!("<head><title>General Echo</title></head>");
    println!("<body><h1 align=center>General Echo</h1>\
  	<hr/>\n");
    println!("</html>");

    // Get the HTTP request method
    let request_method = env::var("REQUEST_METHOD").unwrap_or_default();
    let server_protocol = env::var("SERVER_PROTOCOL").unwrap_or_default();

    // Print the HTTP request method
    println!("<br>HTTP Protocol: {}", server_protocol);
    println!("<br>HTTP Request Method: {}", request_method);
    

    // Read the HTTP request payload
    let stdin = io::stdin();
    let payload = stdin.lock().lines().next().unwrap_or_else(|| Ok("".to_string()))?;

    // Print the HTTP request payload
    println!("<br>HTTP Request Payload: {}", payload);

    Ok(())
}