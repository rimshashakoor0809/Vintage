const Seller = require("../../models/Seller");

class Service {

  constructor() {

  }

  async getSellerDetails(id) {
    const user = await Seller.findById(id)
    if (!user) {
      throw new Error("Seller not found")
    }
    return user;
  }
}

module.exports = new Service();