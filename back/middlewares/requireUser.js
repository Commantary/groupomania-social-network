const jwt = require('jsonwebtoken');
const { User } = require('../models');

require('dotenv/config');

/**
 * Add the user to the request
 * @param req Request
 * @param res Response
 * @param next Next
 */
module.exports = async (req, res, next) => {
   const token = req.headers.authorization.split(' ')[1];
   const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
   const userId = decodedToken.id;

   // Add user to the request
   req.user = await User.findOne({where: {id: userId}});

   next();
}
