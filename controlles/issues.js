const axios = require("axios")
const errorHandler = require("../logicIssue/parseIssue")
const ParseIssue = require("../logicIssue/parseIssue")

module.exports.getIssues = async (req, res) => {
    try {
        const data = await axios.get(`${process.env.JIRA_URL}/rest/api/3/search`, {
            headers: {
                'Authorization': `Basic ${Buffer.from(
                    `${process.env.USER_EMAIL}:${process.env.SECRET}`
                ).toString('base64')}`,
                'Accept': 'application/json'
            },
            body: req.body
        }).then(response => response.data)
        const parseIssues = new ParseIssue()
        const newData = parseIssues.parse(data)
        res.status(200).json(newData)
    } catch (e) {
        errorHandler(res, e)
    }
}
