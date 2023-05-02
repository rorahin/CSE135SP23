#!/usr/bin/env rustc

use std::io::{self, Read};
use std::env;
fn main() -> io::Result<()> {


    

	// Print HTML headers
    println!("Cache-Control: no-cache");
    println!("Content-type: text/html\n");

    // Read request body from stdin
    let mut buffer = String::new();
    io::stdin().read_to_string(&mut buffer)?;

    // Print message body as HTML response
    println!("<html><head><title>POST Message Body</title></head>\
    <body><h1 align=center>POST Message Body</h1>\
    <hr/>\n");
    println!("Message Body: {}<br/>\n", buffer);

    // Print HTML footer
    println!("</body></html>");

    Ok(())

  	


}

