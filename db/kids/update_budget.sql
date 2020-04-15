UPDATE budgets
SET amount_balance = ${total}
WHERE kid_id = ${kid_id}
RETURNING *;