const jwt = require('jsonwebtoken');


isAuth = (req, res, next) => {
    //extract the token from the authorization header
  try {
      const authorizationHeader = req.get('Authorization');

      if(!authorizationHeader)
          throw new Error('Unauthenticated');


      const token = authorizationHeader.split(' ')[1];

      const decodedToken = jwt.verify(token, 'howcanyoubreakhtissupersecretkeyeasily');

      if(!decodedToken)
         throw new Error('Unauthorized');

         req.userId = decodedToken.userId;

         next();

  } catch (error) {
      console.log(error);
      res.json({message: error.message});
  }
}

module.exports = isAuth;