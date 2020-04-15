module.exports = {
    checkUser: (req, res, next) => {
        if(req.session.user) {
            res.status(200).send(req.session.user)
        }
        next();
    },
    isLogin: (req, res, next) => {
        if(!req.session.user) {
            return res.status(401).send('Please user login')
        }
        next()
    },
    isParents: (req, res, next) => {
        const { parentsId } = req.session.user
        if(!parentsId) {
            return res.status(403).send('You are not adminantion')
        }
        next()
    }
}