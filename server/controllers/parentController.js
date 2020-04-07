module.exports = {
    getBudget: (req, res) => {
        const { user_id } = req.params
        const db = req.app.get('db').parents
    },
    postBudget: (req, res) => {
        const { price, user_id } = req.body
        const db = req.app.get('db').parents

    },
    updateBudget: (req, res) => {
        const { budget_id } = req.params
        const { price, user_id } = req.body
        const db = req.app.get('db').parents

    },
    deleteBudget: (req, res) => {
        const { budget_id } = req.params
        const db = req.app.get('db').parents
    }
}