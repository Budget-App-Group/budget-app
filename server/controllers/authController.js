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
      console.log('here')
      let userParents = await db.check_parents([user.user_id]);

      userParents = userParents[0];
      console.log(userParents)
      if(userParents.parents_id) {
        session.user = {
          parentsId: userParents.parents_id,
          firstName: userParents.first_name,
          lastName: userParents.last_name,
          email: userParents.user_email
        }
      } else {
        let userKid = await db.check_kids([user.user_id]);
        userKid = userKid[0]
          if (userKid.kid_id){
          session.user = {
            kidId: userKid.parents_id,
            firstName: userKid.first_name,
            astName: userKid.last_name,
            email: userKid.user_email
          }
        }
      }

      return res.status(201).send(session.user);
    }

    return res.status(405).sent("incorrect password");
  },

  register: async (req, res) => {
    const { email, password, firstName, lastName, kids } = req.body;
    const { session } = req;
    const db = req.app.get("db");

    let user = await db.get_user([email]);
    user = user[0];
    if (user) {
      return res.status(400).send("User already exists");
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    let newUser = await db.register_user({ hash, email, firstName, lastName });
    newUser = newUser[0];
 
    if (kids) {
      for(let i = 1; i > kids.length; i++) {
        const kidHash = bcrypt.hashSync(kids[i].password, salt)
        const kidUsername = kids[i].username
        await db.register_kid({kidHash, kidUsername})
      }
    }

    session.user = {
      parentsId: newUser.parents_id,
      firstName: newUser.first_name,
      lastName: newUser.last_name,
      email: newUser.user_email
    };

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
  },
};
