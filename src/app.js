const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const app = express();

// Set view engine to EJS and configure the views directory.
// Since app.js is in src/ and your templates are in src/templates:
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'templates'));

// Use express-ejs-layouts middleware and set the default layout to "base"
app.use(expressLayouts);
app.set('layout', 'base');

// Middleware for JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assets from the src/assets folder
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Mount routers for shop and admin pages
const shopRouter = require('./routes/shop/shop');
const adminRouter = require('./routes/admin/admin');

app.use('/shop', shopRouter);
app.use('/admin', adminRouter);

// Default route (redirecting to shop)
app.get('/', (req, res) => {
  res.render('shop/index', { title: 'Storefront' });
});

module.exports = app;