const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const {User} = require('../models');
const utils = require("./utils/utils");

function generateToken(user) {
   const payload = {
      id: user.id,
      email: user.email,
   };

   const options = {
      expiresIn: process.env.JWT_DURING
   };

   return jwt.sign(payload, process.env.JWT_SECRET, options);
}

const signup = async (req, res) => {
   const {first_name, last_name, email, password} = req.body;

   let role = 'user';

   try {
      // Check if user exist with same email
      const user = await User.findOne({
         where: {email}
      });

      if (user) {
         return res.status(400).json({
            error: 'User already exists',
            code: 400
         });
      }

      if (req.body.role) {
         role = req.body.role;
      }

      bcrypt.hash(password, process.env.BCRYPT_SALT_ROUND, async (err, hash) => {
         if (err) {
            return utils.handleError(err, res);
         }

         const user = await User.create({
            first_name,
            last_name,
            email,
            password: hash,
            role,
            icon_url: `${req.protocol}://${req.get('host')}/images/default.png`,
         });

         return res.status(201).json({
            message: 'User created',
            user: user,
            code: 201
         });
      });
   } catch (error) {
      utils.handleError(error, res);
   }
}

const login = async (req, res) => {
   const {email, password} = req.body;

   try {
      const user = await User.findOne({
         where: {email}
      });

      if (!user) {
         return res.status(401).json({
            error: 'User not found',
            code: 401
         });
      }

      bcrypt.compare(password, user.password, (err, result) => {
         if (err) {
            return res.status(401).json({
               error: 'Password does not match',
               code: 401
            });
         }

         if (result) {
            return res.status(200).json({
               message: 'User logged in',
               user: user,
               access_token: generateToken(user),
               code: 200
            });
         }
      });
   } catch (error) {
      utils.handleError(error, res);
   }
}

module.exports = {
   signup,
   login
};
