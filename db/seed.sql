
CREATE TABLE users(
user_id SERIAL PRIMARY KEY, 
user_password VARCHAR (255),
user_email VARCHAR (255)
);

CREATE TABLE kid_users (
    kid_id SERIAL PRIMARY KEY,
    kid_username VARCHAR(255),
    kid_password VARCHAR(255)
);

-- CREATE TABLE kids(
    
-- )

CREATE TABLE account (
user_id INT,
FOREIGN KEY (user_id) REFERENCES users (user_id),
first_name VARCHAR (200),
last_name VARCHAR (200),
user_pic BYTEA
);

CREATE TABLE kid_account (
    kid_id INT,
    FOREIGN KEY (kid_id) REFERENCES kid_users (kid_id),
    first_name VARCHAR(200),
    last_name VARCHAR(200),
    kid_pic BYTEA
);

CREATE TABLE budget (
budget_id SERIAL PRIMARY KEY,
user_id INT,
FOREIGN KEY (user_id) REFERENCES users(user_id),
kid_id INT,
FOREIGN KEY (kid_id) REFERENCES kid_users(kid_id),
starting_balance INT,
remaining_balance INT
);

CREATE TABLE control (
user_id INT,
FOREIGN KEY (user_id) REFERENCES users(user_id),
is_admin BOOLEAN
);

CREATE TABLE purchases (
    purchase_id SERIAL PRIMARY KEY,
    kid_id INT,
    FOREIGN KEY (kid_id) REFERENCES kid_users(kid_id),
    amount INT,
    activity VARCHAR(250),
    summary TEXT,
    receipt_img BYTEA
);

CREATE TABLE family (
    parent_id INT,
    FOREIGN KEY(parent_id) REFERENCES users(user_id),
    child_id INT []
);