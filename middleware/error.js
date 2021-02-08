const Logger = require("../logger/logger")

module.exports = (res, error) => {
    Logger.get().info(error.stack)
    Logger.get().info(error.message)
    res.status(500).json({
        success: false,
        message: error.message ? error.message : error
    })
}
