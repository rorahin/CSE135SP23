#!/usr/bin/env rustc

fn main() {
    // Headers
    println!("Cache-Control: no-cache");
    println!("Set-Cookie: destroyed");
    println!("Content-type: text/html\n");

    // Body - HTML
    println!("<html>");
    println!("<head><title>Rust Session Destroyed</title></head>");
    println!("<body>");
    println!("<h1>Rust Session Destroyed</h1>");

    // Links
    println!(
        r#"<a href="/cgi-bin/rust-sessions-1">Back to Page 1</a>
           <br />
           <a href="/cgi-bin/rust-sessions-2">Back to Page 2</a>
           <br />
           <a href="/c-cgiform.html">Rust CGI Form</a>"#
    );

    println!("</body>");
    println!("</html>");
}
