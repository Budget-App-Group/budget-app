module.exports = {
    getKids: async (req, res) => {
        const { parents_id } = req.params
        const db = req.app.get('db').parents

        try {
            let data = await db.get_kids(parents_id)
            res.status(200).send(data)
        }
        catch {
            res.sendStatus(400)
        }
    },
    getKidBudget: async (req, res) => {
        const { parents_id } = req.params
        const { kid_id } = req.body
        const db = req.app.get('db').parents

        try {
            let data = await db.get_kid_budget(parents_id, kid_id)
            data = data[0]

            res.status(200).send(data)
        }
        catch {
            res.sendStatus(400)
        }
        
    },
    getAllKidBudget: async (req, res) => {
        const { parents_id } = req.params
        const db = req.app.get('db').parents

        try {
            let data = await db.get_all_kids_budget(parents_id)
            data = data[0]

            res.status(200).send(data)
        }
        catch {
            res.sendStatus(400)
        }
    },
    postBudget: async (req, res) => {
        const { price, kid_id } = req.body
        const db = req.app.get('db').parents

        try {
            await db.post_budget()
            res.sendStatus(200)
        }
        catch {
            res.sendStatus(400)
        }
    },
    updateBudget: async (req, res) => {
        const { budget_id } = req.params
        const { price, kid_id } = req.body
        const db = req.app.get('db').parents

        try {
            await db.update_budget()
            res.sendStatus(200)
        }
        catch {
            res.sendStatus(400)
        }
    },
    deleteBudget: async (req, res) => {
        const { budget_id } = req.params
        const db = req.app.get('db').parents

        try {
            await db.delete_budget(budget_id)
            res.sendStatus(200)
        }
        catch {
            res.sendStatus(400)
        }
    }
}