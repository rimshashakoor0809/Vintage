const express = require("express");
const upload = require("../../multer");
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, getAllSellerProducts } = require("./product.controller");
const { verifySeller } = require("../../services/protect.service");
const router = express.Router();

router
  .get("/all", getAllProducts)

router
  .get("/all-seller-products/:id", getAllSellerProducts)

router
  .get("/:id", getProductById)

router
  .post("/", upload.array("images"), verifySeller, createProduct)

router
  .put("/:id", updateProduct)

router
  .delete("/:id", deleteProduct)



module.exports = router;