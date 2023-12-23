const User = require("../../models/User");

class Service {

  constructor() {

  }

  async getUserDetails(id) {
    const user = await User.findById(id)
    if (!user) {
      throw new Error("User not found")
    }
    return user;
  }
}

module.exports = new Service();