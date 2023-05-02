#!/usr/bin/env rustc

use std::io::{self, BufRead};

fn main() {
    // Headers
    println!("Cache-Control: no-cache");

    // Get Name from Environment
    let stdin = io::stdin();
    let mut username = String::new();
    stdin.lock().read_line(&mut username).unwrap();

    // Check to see if a proper name was sent
    let mut name = "";
    if username.starts_with("u") {
        name = &username[9..];
    }

    // Set the cookie using a header, add extra \n to end headers
    if !name.is_empty() {
        println!("Content-type: text/html");
        println!("Set-Cookie: {}\n", name);
    } else {
        println!("Content-type: text/html\n");
    }

    // Body - HTML
    println!("<html>");
    println!("<head><title>Rust Sessions</title></head>");
    println!("<body>");
    println!("<h1>Rust Sessions Page 1</h1>");
    println!("<table>");

    // First check for new Cookie, then Check for old Cookie
    if !name.is_empty() {
        println!("<tr><td>Cookie:</td><td>{}</td></tr>", name);
    } else if let Some(cookie) = std::env::var("HTTP_COOKIE").ok().filter(|s| s != "destroyed") {
        println!("<tr><td>Cookie:</td><td>{}</td></tr>", cookie);
    } else {
        println!("<tr><td>Cookie:</td><td>None</td></tr>");
    }

    println!("</table>");

    // Links for other pages
    println!("<br />");
    println!("<a href=\"/cgi-bin/rust-sessions-2\">Session Page 2</a>");
    println!("<br />");
    println!("<a href=\"/rust-cgiform.html\">Home</a>");
    println!("<br /><br />");

    // Destroy Cookie button
    println!("<form action=\"/cgi-bin/rust-destroy-session\" method=\"get\">");
    println!("<button type=\"submit\">Destroy Session</button>");
    println!("</form>");

    println!("</body>");
    println!("</html>");
}