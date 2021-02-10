const instance = require("../middleware/request")
const errorHandler = require("../logicIssue/parseIssue")
const ParseIssue = require("../logicIssue/parseIssue")

module.exports.getIssues = async (req, res) => {
    try {
        const data = await instance.post('/rest/api/3/search', req.body).then(response => response.data)
        const parseIssues = new ParseIssue()
        const newData = parseIssues.parse(data)
        res.status(200).json(newData)
    } catch (e) {
        errorHandler(res, e)
    }
}

