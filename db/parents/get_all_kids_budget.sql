select * from budget
where kid_id = (
    SELECT kid_id FROM family
    where parent_id = $1
)