const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const csrf= require('csurf');
const errorController = require('./controllers/error');
const User = require('./models/user');
const csrfMiddle= require("./middelware/csrf-middle");
const MONGODB_URI =
  'mongodb://localhost:27017/shop';

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

//csrf
const csrfProtection = csrf();
app.use(csrfProtection);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});
app.use(csrfMiddle);
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(MONGODB_URI)
  .then(result => {
        User.find().then(user => {
      console.log("users:",user)
      // if (!user) {
      //   const user = new User({
      //     name: 'Max',
      //     email: 'max@test.com',
      //     cart: {
      //       items: []
      //     }
      //   });
      //   user.save();
      // }
    });
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
