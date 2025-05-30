import jwt from 'jsonwebtoken';


export const generateToken = (userId, userType) => {
  return jwt.sign(
    { 
      userId, 
      userType 
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d'
    }
  );
};


export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid token');
  }
};


export const extractToken = (req) => {
  const authHeader = req.headers.authorization;
  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  
  return null;
};
