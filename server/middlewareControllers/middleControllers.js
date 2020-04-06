module.exports = {
    isUser: (req, res, next) => {
        if(!req.session.user) {
            return res.status(401).send('Please user login')
        }
        next()
    },
    isAdmin: (req, res, next) => {
        if(!req.session.user.isAdmin) {
            return res.status(403).send('You are not adminantion')
        }
        next()
    }
}