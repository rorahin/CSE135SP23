#!/usr/bin/env rustc

use std::time::{SystemTime, UNIX_EPOCH};
use std::env;
fn main() {

	println!("Content-type: text/html\n");
    println!("<html>");
    println!("<head><title>Hello, World!</title></head>");
    println!("<body><h1 align=center>Hello HTML World</h1>\
  	<hr/>\n");
    println!("</html>");
	println!("Hello World<br/>\n");

	if let Some(remote_addr) = env::var("REMOTE_ADDR").ok() {
		println!("User IP address: {}\n", remote_addr);
	} else {
		eprintln!("Error: REMOTE_ADDR environment variable not set\n");
	}
	  
	let current_time = SystemTime::now()
	  .duration_since(UNIX_EPOCH)
	  .expect("Time went backwards")
	  .as_micros();

	let micros_per_second = 1_000_000;
	let micros_per_minute = 60 * micros_per_second;
	let micros_per_hour = 60 * micros_per_minute;
	let micros_per_day = 24 * micros_per_hour;

	let days_since_epoch = current_time / micros_per_day;
	let micros_left = current_time % micros_per_day;

	let year = 1970 + days_since_epoch / 365;
	let days_in_year = days_since_epoch % 365;

	let month_lengths = [
		31, // January
		28, // February (not accounting for leap years)
		31, // March
		30, // April
		31, // May
		30, // June
		31, // July
		31, // August
		30, // September
		31, // October
		30, // November
		31, // December
	];

	let mut month = 0;
	let mut days_left = days_in_year;

	while days_left >= month_lengths[month] {
		days_left -= month_lengths[month];
		month += 1;
	}

	let day = days_left + 1; // add 1 to account for 0-indexing

	let hours = micros_left / micros_per_hour;
	let micros_left = micros_left % micros_per_hour;

	let minutes = micros_left / micros_per_minute;
	let micros_left = micros_left % micros_per_minute;

	let seconds = micros_left / micros_per_second;
	let micros_left = micros_left % micros_per_second;

	println!("Date/Time: ");
	println!(
		"<br>{:04}-{:02}-{:02} {:02}:{:02}:{:02}.{:06}",
		year, month + 1, day, hours, minutes, seconds, micros_left
	);


	
  	
  	// //Printing HTML footer
  	println!("</body></html>");
  	



  	
 


}
