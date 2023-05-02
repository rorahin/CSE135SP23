#!/usr/bin/env rustc

use std::env;

fn main() {
    // Headers
    println!("Cache-Control: no-cache");
    println!("Content-type: text/html\n");

    // Body - HTML
    println!("<html>");
    println!("<head><title>Rust Sessions</title></head>");
    println!("<body>");
    println!("<h1>Rust Sessions Page 2</h1>");
    println!("<table>");

    if let Some(cookie) = env::var("HTTP_COOKIE").ok().filter(|c| *c != "destroyed") {
        println!("<tr><td>Cookie:</td><td>{}</td></tr>", cookie);
    } else {
        println!("<tr><td>Cookie:</td><td>None</td></tr>");
    }

    println!("</table>");


    print!(
        r#"</table>

        <br />
        <a href="/cgi-bin/rust-sessions-1">Session Page 1</a>
        <br />
        <a href="/rust-cgiform.html">Rust CGI Form</a>
        <br /><br />

        <form action="/cgi-bin/rust-destroy-session" method="get">
        <button type="submit">Destroy Session</button>
        </form>

        </body>
        </html>"#
    );
}