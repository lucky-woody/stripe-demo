const express = require('express');
const router = express.Router();

// Shop home page using EJS templating
router.get('/', (req, res) => {
  res.render('shop/index', { title: 'Storefront' });
});

module.exports = router; 