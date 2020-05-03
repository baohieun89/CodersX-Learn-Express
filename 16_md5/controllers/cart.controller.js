var db = require('../db');

module.exports.index = (req, res, next) => {
  res.render('cart/index',{
    products: db.get('products').value(),
    cart: db.get('session')
               .find({id : req.signedCookies.sessionID})
               .get('cart')
               .value()
  })
};
module.exports.addToCart = (req, res, next) => {
  var productID = req.params.productID;
  var sessionID = req.signedCookies.sessionID;
  if(!sessionID){
    res.redirect('/products');
    return;
  }
  var count = db.get('session')
                .find({ id : sessionID })
                .get('cart.' + productID, 0)
                .value();
  db.get('session')
    .find({ id : sessionID })
    .set('cart.' + productID, count + 1)
    .write();
  res.redirect('/products');
};
