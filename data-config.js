const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

var serviceAccount = require("./creds.json");

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

module.exports.db = db
module.exports.category = db.collection('categories')
module.exports.delivery = db.collection('delivery')
module.exports.deliveryTeam = db.collection('deliveryTeam')
module.exports.payments = db.collection('payments')
module.exports.product = db.collection('product')
module.exports.publicationDay = db.collection('publicationDay')
module.exports.publicationPost = db.collection('publicationPost')
module.exports.postTemplates = db.collection('postTemplates')
module.exports.hashtags = db.collection('hashtags')
module.exports.configs = db.collection('configs')
