const DashboardService = require("../services/dashboardService");
const { success } = require("../helpers/httpResponses");

class DashboardController {
  async getInfo(req, res, next) {
    try {
      const data = await DashboardService.getDashboardInfo();
      success(res, data);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new DashboardController();
