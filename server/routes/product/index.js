const express = require("express");
const upload = require("../../multer");
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require("./product.controller");
const router = express.Router();

router
  .get("/all", getAllProducts)

router
  .get("/:id", getProductById)

router
  .post("/", createProduct)

router
  .put("/:id", updateProduct)

router
  .delete("/:id", deleteProduct)



module.exports = router;