const axios = require("axios")
const instance = axios.create({
    baseURL: process.env.JIRA_URL,
    headers: {
        'Authorization': `Basic ${Buffer.from(
            `${process.env.USER_EMAIL}:${process.env.SECRET}`
        ).toString('base64')}`,
        'Accept': 'application/json'
    }
})
module.exports = instance
