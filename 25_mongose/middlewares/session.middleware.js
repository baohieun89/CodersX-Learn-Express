var shortid = require('shortid');
var db = require('../db');
var Session = require('../models/session.model');

module.exports = async function (req, res, next) {
  if(!req.signedCookies.sessionID){
    var sessionID = shortid.generate();
    res.cookie('sessionID', sessionID, {
      signed: true
    });
    var session = await Session.create({
      id: sessionID
    })
    db.get('session').push({
        "id": sessionID
      }).write();
  }
  console.log('')
  next()
}
