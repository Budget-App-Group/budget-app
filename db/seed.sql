
CREATE TABLE users(
user_id SERIAL PRIMARY KEY, 
user_password VARCHAR (255),
user_email VARCHAR (255)
);

CREATE TABLE account (
user_id INT,
FOREIGN KEY (user_id) REFERENCES users (user_id),
first_name VARCHAR (200),
last_name VARCHAR (200),
user_pic VARCHAR (500)
);

CREATE TABLE budget (
budget_id INT,
user_id INT,
FOREIGN KEY (user_id) REFERENCES users(user_id),
starting_balance INT,
remaining_balance INT
);

CREATE TABLE control (
user_id INT,
FOREIGN KEY (user_id) REFERENCES users(user_id),
is_admin BOOLEAN,
is_kid BOOLEANx
);
