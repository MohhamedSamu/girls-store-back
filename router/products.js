const express = require("express");
const router = express.Router();

const cloudinary = require('cloudinary');

cloudinary.v2.config({
  cloud_name: 'dae0fnrdt',
  api_key: '631496324881983',
  api_secret: 'pmzZUAc4JvNJp-h0lLktvSzlPUA',
  secure: true,
});


const db = require('../data-config.js')

router.get("/test", (req, res) => {
  res.send("HELLO WORLD FROM PRODUCTS")
})

router.get("/", async (req, res) => {
  const snapshot = await db.product.get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  res.send({msg: "Operation get completed", return: list});
});

router.post("/", async (req, res) => {
  const data = req.body
  let retMsg = await db.product.add(data)
  res.send({msg: "Operation post completed", return: retMsg});
});

router.post("/deleteImages", async (req, res) => {
  const data = req.body

  cloudinary.v2.api
  .delete_resources(data, 
    { type: 'upload', resource_type: 'image' })
  .then((retMsg)=>{
    res.send({msg: "Operation post completed", return: retMsg});
  });
});

router.post("/publish", async (req, res) => {
  const data = req.body
  
  // Get a new write batch
  const batch = db.db.batch();
  data.forEach(async(product) => {
    const tempProdRef = db.product.doc(product);
    batch.update(tempProdRef, {published: true});
  });
  let retMsg = await batch.commit();
  res.send({msg: "Operation post completed", return: retMsg});
});

router.post("/select", async (req, res) => {
  const data = req.body
  
  // Get a new write batch
  const batch = db.db.batch();
  data.forEach(async(product) => {
    const tempProdRef = db.product.doc(product);
    batch.update(tempProdRef, {selected: true});
  });
  let retMsg = await batch.commit();
  res.send({msg: "Operation post completed", return: retMsg});
});

router.post("/unSelect", async (req, res) => {
  const data = req.body
  
  // Get a new write batch
  const batch = db.db.batch();
  data.forEach(async(product) => {
    const tempProdRef = db.product.doc(product);
    batch.update(tempProdRef, {selected: false});
  });
  let retMsg = await batch.commit();
  res.send({msg: "Operation post completed", return: retMsg});
});

router
  .route("/:id")
  .get(async (req, res) => {
    const id = req.params.id;
    const snapshot = await db.product.get();
    const retMsg = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })).filter((doc) => doc.id == id);
    res.send({msg: "Operation get by id completed", return: retMsg});
  })
  .put(async (req, res) => {
    const id = req.params.id;
    delete req.body.id;
    let retMsg = await db.product.doc(id).update(req.body)
    res.send({msg: "Operation update completed", return: retMsg});
  })
  .delete(async (req, res) => {
    const id = req.params.id;
    let retMsg = await db.product.doc(id).delete()
    res.send({msg: "Operation delete completed", return: retMsg});
  });

  module.exports = router;
