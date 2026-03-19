const jwt = require("jsonwebtoken");

const loginAdmin = (req, res) => {
  const { email, password } = req.body;

  if (
    email !== process.env.ADMIN_EMAIL ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.status(401).json({ msg: "Invalid credentials" });
  }

  const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.json({ msg: "Login successful" });
};

const checkAuth = (req, res) => {
  res.json({ msg: "Authorized" });
};

const logoutAdmin = (req, res) => {
  res.clearCookie("token");
  res.json({ msg: "Logged out" });
};

module.exports = { loginAdmin, checkAuth, logoutAdmin };