const log = require("../../logger");
const Product = require("../../models/Product");
const Seller = require("../../models/Seller");
const ErrorHandler = require("../../utils/ErrorHandler");

class Controller {

  constructor() {

  }
  async getAllProducts(req, res, next) {
    try {
      const products = await Product.find();

      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      log.error(error, "Error fetching all product: ")
      ErrorHandler(res, error)
    }
  }
  async getProductById(req, res, next) {
    try {

    } catch (error) {

    }
  }
  async createProduct(req, res, next) {
    try {
      const shopId = req.seller.id;
      console.log("Shop Id:", shopId)
      const shop = await Seller.findById(shopId);
      console.log("SHop:", shop)
      if (!shop || !shopId) {
        return res.status(400).json({
          success: false,
          message: "Invalid Seller Id.",
          data: null

        })
      }
      const files = req.files;
      const imageUrl = files.map(file => `${file.filename}`)
      const productData = req.body;
      productData.images = imageUrl;
      productData.shop = shop;
      productData.shopId = shopId;

      const product = await Product.create(productData);
      res.status(201).json({
        success: true,
        product,
      });
    } catch (error) {
      log.error(error, "Error creating product: ")
      ErrorHandler(res, error)
    }
  }

  async getAllSellerProducts(req, res, next) {
    const { id } = req.params;
    console.log("Seller Id:", id);
    try {
      const products = await Product.find({ shopId: id });

      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      log.error(error, "Error fetching seller product: ")
      ErrorHandler(res, error)
    }
  }
  async updateProduct(req, res, next) {
    try {

    } catch (error) {

    }
  }
  async deleteProduct(req, res, next) {
    try {
      console.log("Id Check:", req.params.id)
      const product = await Product.findByIdAndDelete(req.params.id);

      if (!product) {
        return res.status(400).json({
          success: false,
          message: "Invalid product Id.",
          data: null

        })
      }
      res.status(201).json({
        success: true,
        message: "Product deleted successfully!",
      });
    } catch (error) {
      log.error(error, "Error deleting seller product: ")
      ErrorHandler(res, error)
    }
  }
}

module.exports = new Controller();