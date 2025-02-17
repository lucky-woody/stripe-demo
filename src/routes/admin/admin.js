const express = require('express');
const router = express.Router();

// Admin home page using EJS templating
router.get('/', (req, res) => {
  res.render('admin/index', { title: 'Admin Dashboard' });
});

module.exports = router;