const drugStoreController = require("../controllers/drugStoreController");
const express = require("express");
const router = express.Router();

// get all products
router.get("/", drugStoreController.allProducts);
// get product by id
router.get("/:id", drugStoreController.getProdutcDetail);

module.exports = router;