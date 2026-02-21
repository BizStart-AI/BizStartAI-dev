// src/routes/user.routes.js
const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth.middleware");
const User = require("../models/user.model");

router.get("/me", authenticate, async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      data: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
