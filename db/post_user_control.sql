INSERT INTO control(user_id, is_admin)
VALUES(${user_id}, ${isAdmin})
RETURNING *;