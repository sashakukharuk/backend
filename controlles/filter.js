const axios = require("axios")
const errorHandler = require("../middleware/error")

module.exports.getFilter = async (req, res) => {
    try {
        const filter =  await axios.get(`${process.env.JIRA_URL}/rest/api/3/filter`, {
            headers: {
                'Authorization': `Basic ${Buffer.from(
                    `${process.env.USER_EMAIL}:${process.env.SECRET}`
                ).toString('base64')}`,
                'Accept': 'application/json'
            },
            body: req.body
        }).then(response => response.data)

        res.status(200).json(filter)
    } catch (e) {
        errorHandler(res, e)
    }
}
