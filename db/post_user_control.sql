INSERT INTO control(user_id, is_admin, is_kid)
VALUES(${user_id}, ${isAdmin}, ${isKid})
RETURNING *;