const express = require("express")
const controller = require('../controlles/issues')
const router = express.Router()

router.post('/', controller.getIssues)

module.exports = router
