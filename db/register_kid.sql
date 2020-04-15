WITH new_register as (
    INSERT INTO users(user_email, user_password) VALUES(${username}, ${hash})
    RETURNING user_id as id
), new_kid as (
    INSERT INTO kids(kid_id, first_name, last_name, user_pic) VALUES((SELECT id FROM new_register), ${firstName}, ${lastName}, ${pic})
    RETURNING kid_id as id
), new_family as (
    INSERT INTO family(parents_id, kid_id)
    VALUES(${parents_id}, (SELECT id FROM new_kid))
    RETURNING kid_id as id
)
INSERT INTO budgets(kid_id, amount_balance, balance) VALUES((SELECT id FROM new_family), 0, 0);