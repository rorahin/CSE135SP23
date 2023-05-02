#!/usr/bin/env rustc

use std::collections::HashMap;
use std::env;
use std::time::SystemTime;

fn main() {
    let remote_addr = env::var("REMOTE_ADDR").unwrap_or("".to_string());
    let time = SystemTime::now().duration_since(SystemTime::UNIX_EPOCH).unwrap_or_default().as_secs();

    let mut message = HashMap::new();


	let datetime = std::time::UNIX_EPOCH + std::time::Duration::from_secs(time as u64);
    let formatted_datetime = format_datetime(datetime);

    message.insert("title", "Hello, Rust!");
    message.insert("heading", "Hello, Rust!");
    message.insert("message", "This page was generated with the Rust programming language");
	message.insert("date/time", &formatted_datetime);
    message.insert("ip address", &remote_addr);

    let json = format!(
        r#"{{"title":"{}","heading":"{}","message":"{}","date/time":"{}","ip address":"{}"}}"#,
        message.get("title").unwrap_or(&""),
        message.get("heading").unwrap_or(&""),
        message.get("message").unwrap_or(&""),
        message.get("date/time").unwrap_or(&""),
        message.get("ip address").unwrap_or(&""),
    );

    println!("Cache-Control: no-cache");
    println!("Content-type: application/json\n");
    println!("{}", json);
}

fn format_datetime(datetime: std::time::SystemTime) -> String {
    let date = format_date(datetime);
    let time = format_time(datetime);
    format!("{} {}", date, time)
}

fn format_date(datetime: std::time::SystemTime) -> String {
    let dt = datetime.duration_since(std::time::UNIX_EPOCH).unwrap();
    format!("{:04}-{:02}-{:02}", dt.as_secs() / 86_400 / 365 + 1970, dt.as_secs() / 86_400 % 365 + 1, dt.as_secs() / 86_400 % 31 + 1)
}

fn format_time(datetime: std::time::SystemTime) -> String {
    let dt = datetime.duration_since(std::time::UNIX_EPOCH).unwrap();
    format!("{:02}:{:02}:{:02}", dt.as_secs() % 86_400 / 3600, dt.as_secs() % 3600 / 60, dt.as_secs() % 60)
}