
use chrono;
fn main() {
    
    //printing HTML header
    println!("Cache-Control: no-cache\n");
    println!("Content-type: text/html\n\n");
    println!("<html><head><title>Hello CGI World</title></head>\
	<body><h1 align=center>Hello HTML World</h1>\
  	<hr/>\n");
  	
  	println!("Hello World<br/>\n");
  	println!("This program was generated at: {}\n<br/>", chrono::offset::Local::now());
  	println!("Your current IP address is: <br/>");
  	
  	
  	
  	//Printing HTML footer
  	println!("</body></html>");
  	
 


}
