INSERT INTO control(user_id, isAdmin, isKid)
VALUES(${user_id}, ${isAdmin}, ${isKid})
RETURNING *;