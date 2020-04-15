const bcrypt = require("bcryptjs");


module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body;
    const { session } = req;
    const db = req.app.get("db");
    let user = await db.get_user([email]);
    user = user[0];
    if (!user) {
      return res.status(405).send("Email not found");
    }

    const authenticated = bcrypt.compareSync(password, user.user_password);
    if (authenticated) {
      let userParents = await db.check_parents([user.user_id]);
      userParents = userParents[0];
      if(userParents !== undefined) {
        session.user = {
          parentsId: userParents.parents_id,
          firstName: userParents.first_name,
          lastName: userParents.last_name,
          email: userParents.user_email
        }
      } else {
        let userKid = await db.check_kids([user.user_id]);
        userKid = userKid[0]
          if (userKid){
          session.user = {
            kidId: userKid.kid_id,
            firstName: userKid.first_name,
            lastName: userKid.last_name,
            email: userKid.user_email
          }
        }
      }

      return res.status(201).send(session.user);
    }

    return res.status(405).sent("incorrect password");
  },

  register: async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    const { session } = req;
    const db = req.app.get("db");

    let user = await db.get_user([email]);
    user = user[0];
    if (user) {
      return res.status(400).send("User already exists");
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    console.log('last: ' + lastName)
    let newUser = await db.register_user({ hash, email, firstName, lastName });
    newUser = newUser[0];

    session.user = {
      parentsId: newUser.parents_id,
      firstName: newUser.first_name,
      lastName: newUser.last_name,
      email: newUser.user_email
    };

    res.status(201).send(session.user);
  },
  kidRegister: async (req, res) => {
    const { parents_id } = req.params
    const { kids } = req.body;
    const db = req.app.get("db");
    if (kids) {
      for(let kid = 0; kid < kids.length; kid++) {
        const { username, password, firstName, lastName, pic } = kids[kid]
        let user = await db.get_user([username]);
        user = user[0];
        
        if (user) {
          return res.status(400).send("User already exists");
        }
        
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        
        console.log('here')
        let newUser = await db.register_kid({ parents_id, hash, username, firstName, lastName, pic });
        newUser = newUser[0];
        console.log('data: ' + newUser)

        res.sendStatus(200);
      }
    }
    res.sendStatus(404)
  },

  logout: (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  },

  getUser: (req, res) => {
    if (req.session.user) {
      res.status(200).send(req.session.user);
    } else {
      res.sendStatus(400);
    }
  },
};
