const express = require("express");
const router = express.Router();

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

router.post("/publish", async (req, res) => {
  const data = req.body
  
  // Get a new write batch
  const batch = db.db.batch();
  data.forEach(async(product) => {
    const tempProdRef = db.product.doc(product);
    const doc = await tempProdRef.get();
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      batch.update(tempProdRef, {published: true, timesPublished: doc.data().timesPublished++});
    }
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
