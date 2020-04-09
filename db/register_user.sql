-- INSERT INTO users (
--     user_email,
--     user_password
-- ) VALUES (
--     ${email},
--     ${hash}
-- ) RETURNING *;

WITH new_register as (
    INSERT INTO users(user_email, user_password) VALUES(${email}, ${hash})
    RETURNING user_id as id, user_email
)
INSERT INTO parents(parents_id, first_name, last_name) VALUES((SELECT id from new_register), ${firstName}, ${lastName})
RETURNING *, (SELECT user_email from new_register)