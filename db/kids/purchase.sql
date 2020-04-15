INSERT INTO purchases (kid_id, amount, activity, summary, location)
VALUES (${kid_id}, ${amount}, ${types}, ${summary}, ${location});

SELECT * FROM purchases WHERE kid_id = ${kid_id} ORDER BY purchase_id DESC LIMIT 3;