var express = require("express");
var router = express.Router();
const User = require("../models/user-model.js");
const bcrypt = require("bcrypt-nodejs");
/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index");
});
router.get("/signup", (req, res, next) => {
  res.render("sign-up");
});
router.post("/process-signup", (req, res, next) => {
  const { preNom, nom, eMail, originalPassword } = req.body;
  if (!originalPassword || originalPassword.match(/[0-9]/) === null) {
    res.redirect("/signup");
    return;
  }
  const encryptedPassword = bcrypt.hashSync(originalPassword, 10);
  User.create({
    preNom,
    nom,
    eMail,
    encryptedPassword
  })
    .then(userDoc => {
      res.redirect("/");
    })
    .catch(err => next(err));
});
router.post("/process-login", (req, res, next) => {
  const { eMail, originalPassword } = req.body;
  User.findOne({ eMail: { $eq: eMail } })
    .then(userDoc => {
      if (!userDoc) {
        next(new Error("Incorrect email. 🤦‍♂️"));
        return;
      }
      //   } else {
      //     req.logIn(userDoc, () => {
      //       res.redirect("/");
      //     });
      //   }
      const { encryptedPassword } = userDoc;
      if (!bcrypt.compareSync(originalPassword, encryptedPassword)) {
        next(new Error("Incorrect password. 🤯"));
      } else {
        req.logIn(userDoc, () => {
          res.redirect("/");
        });
      }
    })
    .catch(err => next(err));
});
router.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/");
});
module.exports = router;
