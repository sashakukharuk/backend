const instance = require("../middleware/request")
const errorHandler = require("../middleware/error")

module.exports.getFilter = async (req, res) => {
    try {
        const filter =  await instance.get('/rest/api/3/filter', req.body).then(response => response.data)
        res.status(200).json(filter)
    } catch (e) {
        errorHandler(res, e)
    }
}
