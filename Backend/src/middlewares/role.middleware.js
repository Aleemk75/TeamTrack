export const checkRole = (requiredRole) => {
  return (req, res, next) => {
    // console.log("checkrolemiddleware",req.user);
    
    // console.log("role:",req.user.role);
    
    if (req.user.role !== requiredRole) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admins only.",
      });
    }
    next();
  };
};
