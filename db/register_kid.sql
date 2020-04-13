WITH new_register as (
    INSERT INTO users(user_email, user_password) VALUES(${username}, ${hash})
    RETURNING user_id as id
), new_kid as (
    INSERT INTO kids(kid_id, first_name, last_name, user_pic) VALUES((SELECT id from new_register), ${firstName}, ${lastName}, ${pic})
    RETURNING kid_id as id
)
INSERT INTO family(parents_id, kid_id)
VALUES(${parents_id}, (select id from new_kid));