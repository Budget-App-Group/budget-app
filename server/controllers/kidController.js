module.exports = {
    getBudget: async (req, res) => {
        const { user_id } = req.params
        const db = req.app.get('db')

        try {
            let dataBudget = await db.getBudget(user_id)
            dataBudget = dataBudget[0]

            res.status(200).send(dataBudget)
        }
        catch {
            res.status(400).send('Disconnect')
        }
        
    },
    postBudget: async (req, res) => {
        const { user_id } = req.params
        const { price, activities, location, pic, description } = req.body
        const db = req.app.get('db')

        try {
            await db.postBudget([user_id, price, activities, location, pic, description])
            res.sendStatus(200)
        }
        catch {
            res.sendStatus(500)
        }
    },
    updateBudget: async (req, res) => {
        const { budget_id } = req.params
        const { price, activities, location, pic, description } = req.body
        const db = req.app.get('db')

        try {
            await db.updateBudget([budget_id, price, activities, location, pic, description])
            res.sendStatus(200)
        }
        catch {
            res.sendStatus(500)
        }
    }
}