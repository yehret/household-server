import jwt from 'jsonwebtoken'
import { createError } from './createError.js'

export const isAdmin = (req, res, next) => {
   const token = req.cookies.access_token;
   if (!token) return next(createError(401, "You are not authenticated or you do not have a permission!"));
 
   jwt.verify(token, process.env.JWT, (err, user) => {
     if (err) return next(createError(403, "Token is not valid!"));

     if(user.role !== "admin") {
      return next(createError(403, "У вас немає прав на виконання даної дії"))
     }

     req.user = user;
     next()
   });
 };