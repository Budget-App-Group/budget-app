module.exports = {
    getBudget: async (req, res) => {
        const { kid_id } = req.params
        const db = req.app.get('db').kids

        try {
            let dataBudget = await db.get_budget(kid_id)
            dataBudget = dataBudget[0]

            res.status(200).send(dataBudget)
        }
        catch {
            res.status(400).send('Disconnect')
        }
        
    },
    postPurchase: async (req, res) => {
        const { kid_id } = req.params
        const { price, activity, location, pic, description } = req.body
        const db = req.app.get('db').kids

        try {
            await db.purchase([kid_id, price, activity, location, pic, description])
            res.sendStatus(200)
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
            await db.updateBud([budget_id, price])
            res.sendStatus(200)
        }
        catch {
            res.sendStatus(500)
        }
    }
}