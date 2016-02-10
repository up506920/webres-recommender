CREATE DATABASE IF NOT EXISTS recommender;
USE recommender;
CREATE TABLE IF NOT EXISTS category(category_id INT(10) NOT NULL AUTO_INCREMENT, category VARCHAR(50) NOT NULL,	PRIMARY KEY(category_id));
-- CREATE TABLE IF NOT EXISTS user(user_id INT(10) NOT NULL AUTO_INCREMENT, user_name INT(250) NOT NULL, password VARCHAR(250) NOT NULL, email VARCHAR(250) NOT NULL, PRIMARY KEY(user_id));
CREATE TABLE IF NOT EXISTS user(user_id INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY, foursq_id VARCHAR(50));
CREATE TABLE IF NOT EXISTS place(place_id INT(10) NOT NULL AUTO_INCREMENT, category_id INT(10) NOT NULL, address VARCHAR(250) NOT NULL, latitude INT(10) NOT NULL, longitude INT(10) NOT NULL, visited INT(10) NOT NULL,PRIMARY KEY(place_id), FOREIGN KEY(category_id) REFERENCES category(category_id));
CREATE TABLE IF NOT EXISTS socialize(socialize_id INT(10) NOT NULL AUTO_INCREMENT, place_id INT(10) NOT NULL, time TIMESTAMP NOT NULL, user_id INT(10) NOT NULL, PRIMARY KEY(socialize_id), FOREIGN KEY(place_id) REFERENCES place(place_id), FOREIGN KEY(user_id) REFERENCES user(user_id));
CREATE TABLE IF NOT EXISTS sequence(start INT(10),end INT(10),PRIMARY KEY(start, end),FOREIGN KEY(start) REFERENCES socialize(socialize_id),FOREIGN KEY(end) REFERENCES socialize(socialize_id));
CREATE TABLE IF NOT EXISTS preference(preference_id INT(10) NOT NULL AUTO_INCREMENT, user_id INT(10) NOT NULL, place_id INT(10) NOT NULL, dislike VARCHAR(250) NOT NULL, PRIMARY KEY(preference_id), FOREIGN KEY(user_id) REFERENCES user(user_id), FOREIGN KEY(place_id) REFERENCES place(place_id));
