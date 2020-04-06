const bcrypt = require("bcryptjs")

module.exports = {
    login: async (req, res) => {
        const { email, password } = req.body
        const { session } = req;
        const db = req.app.get('db');
        let user = await db.get_user([email]);
        user = user[0];
        if (!user) {
            return res.status(405).send("Email not found");
        }

        const authenticated = bcrypt.compareSync(password, user.user_password);
        if (authenticated) {
            let userController = await db.check_user([user.email])
            userController = userController[0]
            session.user = {
                email: userController.email,
                isAdmin: userController.isAdmin,
                isKid: userController.isKid
            }
            return res.status(201).send(session.user);
        }

        return res.status(405).sent("incorrect password")
    },

    register: async (req, res) => {
        const { email, password, isAdmin, isKid } = req.body
        const { session } = req;
        const db = req.app.get('db')

        let user = await db.get_user([email]);
        user = user[0];
        if (user) {
            return res.status(400).send("User already exists");
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        let newUser = await db.register_user({ hash, email });
        newUser = newUser[0];

        const user_id = newUser.user_id

        let newUserControl = await db.post_user_control({ user_id, isAdmin, isKid})
        newUserControl = newUserControl[0]

        session.user = {
            email: newUser.email,
            isAdmin: newUserControl.isAdmin,
            isKid: newUserControl.isKid,
        }
        
        res.status(201).send(session.user);
    },

    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    },

    getUser: (req, res) => {
        if (req.session.user) {
            res.status(200).send(req.session.user);
        } else {
            res.sendStatus(200);
        }
    }
}