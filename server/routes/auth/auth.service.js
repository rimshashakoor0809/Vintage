const User = require("../../models/User");

class Service {

  constructor() {

  }

  async registerUser(payload) {
    const { name, email, password, fileUrl } = payload;
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error("user already exists.")
    }
    const user = await User.create({
      name,
      email,
      password,
      avatar: fileUrl
    });

    if (!user) {
      throw new Error("Failed to register new user.")
    }

    return user;
  }

  async loginUser(payload) {
    const { email, password } = payload;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new Error("User not found")
    }

    const validPassword = await user.comparePassword(password);
    if (!validPassword) {
      throw new Error("Please provide correct password.")
    }
    console.log("user:", user);
    return user;
  }

  async registerSeller(payload) {
    const { name, email, password, fileUrl } = payload;
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error("user already exists.")
    }
    const user = await User.create({
      name,
      email,
      password,
      avatar: fileUrl
    });

    if (!user) {
      throw new Error("Failed to register new user.")
    }

    return user;
  }

  async loginSeller(payload) {
    const { email, password } = payload;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new Error("User not found")
    }

    const validPassword = await user.comparePassword(password);
    if (!validPassword) {
      throw new Error("Please provide correct password.")
    }
    console.log("user:", user);
    return user;
  }
}

module.exports = new Service();