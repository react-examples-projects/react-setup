class DashboardService {
  constructor() {
    this.UserModel = require("../models/User");
  }
  async getDashboardInfo() {
    const admins = this.UserModel.countDocuments({ rank: "admin" });
    const users = this.UserModel.countDocuments({ rank: "user" });
    const data = await Promise.all([admins, users]);
    return {
      admins: data[0],
      users: data[1],
      roles: 4,
    };
  }
}

module.exports = new DashboardService();
