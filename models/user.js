const mongodb = require('mongodb');
const { getDb } = require('../util/database');
const db = require('../util/database').getDb;

const ObjectId = mongodb.ObjectId;



class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }
  save() {
    const db = getDb();
    return db.collection('users').insertOne(this);
  }

  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex(cp => {
      return cp.productId == product._id;
    });
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if(cartProduct >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    
    
    updatedCartItems[cartProductIndex].quantity.newQuantity;
  }else{
    updatedCartItems.push({productId: new ObjectId(product._id), quantity: newQuantity});

  }
    //product.quantity = 1;
    const updatedCart = {
      items: updatedCartItems
    };
    const db = getDb();
    return db
    .collection('users')
    .updateOne(
      {_id: new ObjectId(this._id) },
      {$set: {cart: updatedCart}}
      );
  }

  getCart() {
    // return this.cart;
    const db = getDb();
    const productIds = this.cart.items.map(i => {
      return i.productId;
    });
    return db
    .collection('products')
    .find({_id: {$in: productIds}})
    .toArray()
    .then(products => {
      return products.map(p => {
        return {...p, quantity: this.cart.items.find(i => {
          return i.productId.toString() === p._id.toString();
        }).quantity
      };
      });
    })
    ;
  }

deleteItemFromCart(productId) {
  //const updatedCartItems = [...this.cart.items];
  const updatedCartItems = this.cart.items.filter(item => {
    return item.productId !== productId.toString();
  });
  const db = getDb();
    return db
    .collection('users')
    .updateOne(
      {_id: new ObjectId(this._id) },
      {$set: {cart: {items: updatedCartItems}}}
      );
}

addOrder() {
  const db = getDb();
  this.getCart().then(products => {
    const order = {
      items: products,
      user: {
        _id: new ObjectId(this._id),
        name: this.name,
        email: this.email
      }
    };
    return db.collection('orders').insertOne(order);
  })
  
  .then(result => {
    this.cart = {items: []};
    return db
    .collection('users')
    .updateOne(
      {_id: new ObjectId(this._id)},
      {$set: {cart: {items: []}}}
    );
  });
}

getOrders() {
  const db = getDb();
  return db.collection('orders').find({'user._id': new ObjectId(this._id)}).toArray();
}

  static findById(userId) {
    const db = getgetDb();
    return db
    .collection('users')
    .findOne({_id: new ObjectId(userId)})
    //.next();
    .then(user => {
      console.log(user);
      return user;
    })
  }
}

// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

// const User = sequelize.define('user', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   name: Sequelize.STRING,
//   email: Sequelize.STRING
// });

module.exports = User;
