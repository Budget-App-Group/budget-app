module.exports = {
    getBudget: async (req, res) => {
        const { kid_id } = req.params
        const { session } = req
        const db = req.app.get('db').kids
        try {
            let dataBudget = await db.get_budget(kid_id)
            dataBudget = dataBudget[0]
            session.budget = {
                budgetId: dataBudget.budget_id,
                kidId: dataBudget.kid_id,
                amount: dataBudget.amount_balance
            }
            res.status(200).send(session.budget)
        }
        catch {
            res.status(400).send('Disconnect')
        }
        
    },
    getPurchases: async (req, res) => {
        const { kid_id } = req.params
        const db = req.app.get('db').kids
        try {
            let dataPurchase = await db.get_purchase(kid_id)
            res.status(200).send(dataPurchase)
        }
        catch {
            res.status(400).send("We cannot get history")
        }
    },
    postPurchase: async (req, res) => {
        const { kid_id } = req.params
        const { amount, types, location, summary } = req.body
        const db = req.app.get('db').kids

        try {
            let dataPurchase = await db.purchase({kid_id, amount, types, location, summary})
            res.status(200).send(dataPurchase)
        }
        catch {
            res.sendStatus(500)
        }
    },
    updatePurchase: async (req, res) => {
        const { purchase_id } = req.params
        const { price, activity, location, pic, description } = req.body
        const db = req.app.get('db').kids

        try {
            await db.update_purchase([purchase_id, price, activity, location, pic, description])
            res.sendStatus(200)
        }
        catch {
            res.sendStatus(400)
        }
    },
    updateBudget: async (req, res) => {
        const { budget_id } = req.params
        const { price } = req.body
        const db = req.app.get('db').kids

        try {
            await db.update_budget([budget_id, price])
            res.sendStatus(200)
        }
        catch {
            res.sendStatus(500)
        }
    }
}