select * from budgets
where budget_id = $1

-- select * from kid_purchase kp
-- where kp.kid_id = (
--     select kid_id from family
--     where parent_id = $1
-- )