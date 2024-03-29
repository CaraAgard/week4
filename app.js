const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
// const sequelize = require('./util/database');
// const Product = require('./models/product');
const User = require('./models/user');
// const Cart = require('./models/cart');
// const CartItem = require('./models/cart-item');
// const Order = require('./models/order');
// const OrderItem = require('./models/order-item');

//const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

 const adminRoutes = require('./routes/admin');
 const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('Mtch9uSF4vKFC5iq')
    .then(user => {
      //req.user = new User(user.name, user.email, user.cart, user._id);
     req.user = user;
      next();
    })
    .catch(err => console.log(err));
  //next();
});

 app.use('/admin', adminRoutes);
 app.use(shopRoutes);

app.use(errorController.get404);

// Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
// User.hasMany(Product);
// User.hasOne(Cart);
// Cart.belongsTo(User);
// Cart.belongsToMany(Product, { through: CartItem });
// Product.belongsToMany(Cart, { through: CartItem });
// Order.belongsTo(User);
// User.hasMany(Order);
// Order.belongsToMany(Product, { through: OrderItem });

// sequelize
//   // .sync({ force: true })
//   .sync()
//   .then(result => {
//     return User.findById(1);
//     // console.log(result);
//   })
//   .then(user => {
//     if (!user) {
//       return User.create({ name: 'Max', email: 'test@test.com' });
//     }
//     return user;
//   })
//   .then(user => {
//     // console.log(user);
//     return user.createCart();
//   })
//   .then(cart => {
//     app.listen(3000);
//   })
//   .catch(err => {
//     console.log(err);
//   });

// mongoConnect(() => {
  
//   app.listen(3000);
// });

mongoose.connect('mongodb+srv://cara:<S5Bs9pv5HTwVdUno>@cluster0.iihx6.mongodb.net/shop?retryWrites=true&w=majority'
)
.then(result => {
  User.findOne().then(user => {
    if (!user) {
      const user = new User ({
        name: 'Cara',
        email: 'cara.agard1@gmail.com',
        cart: {
          items: []
        }
      });
      user.save();

    }
  });
  
  app.listen(3000);
}).catch(err => {
  console.log(err);
});
