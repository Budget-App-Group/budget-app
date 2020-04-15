
CREATE TABLE users(
user_id SERIAL PRIMARY KEY, 
user_password VARCHAR (255),
user_email VARCHAR (255)
);

CREATE TABLE parents(
    parents_id INT,
    FOREIGN KEY (parents_id) REFERENCES users(user_id),
    first_name VARCHAR(200),
    last_time VARCHAR(200),
    user_pic BYTEA
);

CREATE TABLE kids(
   kid_id INT,
   FOREIGN KEY (kid_id) REFERENCES users(user_id),
   first_name VARCHAR (200),
   last_name VARCHAR (200),
   user_pic BYTEA
);

-- CREATE TABLE account (
-- user_id INT,
-- FOREIGN KEY (user_id) REFERENCES users (user_id),
-- first_name VARCHAR (200),
-- last_name VARCHAR (200),
-- user_pic BYTEA
-- );

-- CREATE TABLE kid_account (
--     kid_id INT,
--     FOREIGN KEY (kid_id) REFERENCES kid_users (kid_id),
--     first_name VARCHAR(200),
--     last_name VARCHAR(200),
--     kid_pic BYTEA
-- );

CREATE TABLE budgets (
    budget_id SERIAL PRIMARY KEY,
    kid_id INT,
    FOREIGN KEY (kid_id) REFERENCES users(user_id),
    amount_balance INT
);

ALTER TABLE budgets ADD COLUMN balance INT;

-- CREATE TABLE control (
-- user_id INT,
-- FOREIGN KEY (user_id) REFERENCES users(user_id),
-- is_admin BOOLEAN
-- );

CREATE TABLE purchases (
    purchase_id SERIAL PRIMARY KEY,
    kid_id INT,
    FOREIGN KEY (kid_id) REFERENCES kid_users(kid_id),
    amount INT,
    location JSON,
    activity VARCHAR(250),
    summary TEXT,
    receipt_img BYTEA
);

CREATE TABLE family (
    parents_id INT,
    FOREIGN KEY(parents_id) REFERENCES parents(parents_id),
    kid_id INT,
    FOREIGN KEY(kid_id) REFERENCES kids(kid_id)
);