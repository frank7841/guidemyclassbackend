module.exports = (req, res, next) => {
  const userRole = req.role;

  if (userRole !== null) {
    req.myrole = userRole;

    if (req.myrole === 'owner') {
      req.owner = req.myrole;
    }
    if (req.myrole === 'admin') {
      req.admin = req.myrole;
    }
    if (req.myrole === 'member') {
      req.member = req.myrole;
    }
    if (req.myrole === 'moderator') {
      req.moderator = req.myrole;
    }

    req.isRole = true;

    next();
  } else {
    return res.status(401).json({
      message: "you don't have permission",
    });
  }
};
