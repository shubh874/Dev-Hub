const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const User = require("../../model/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

//@route  POST api/user
//@desc   register user
router.post(
  "/",
  [
    check("name", "name is required").not().isEmpty(),
    check("email", "Valid email is required").isEmail(),
    check("password", "password should be atleast 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // user exists check
    try {
      const { name, email, password } = req.body;
      let userCheck = await User.findOne({ email });
      if (userCheck) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }
      //setting up the gravatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      const user = new User({
        name,
        email,
        avatar,
        password,
      });
      // hashing the password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };
      await jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
