UPDATE kid_purchase
SET price = ${price},
    activity = ${activity},
    summary = ${summary},
    receipt_pic = ${pic}
WHERE kid_id = ${kid_id}