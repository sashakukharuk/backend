const {getUserInfo, stepChangeFilter, stepError, stepGenerationTable, stepLink} = require("../controlles/steps")
const express = require("express")
const router = express.Router()

router.get('/userinfo/:sub', getUserInfo)
router.post('/link', stepLink)
router.post('/change/filter', stepChangeFilter)
router.post('/generation/table', stepGenerationTable)
router.post('/error', stepError)

module.exports = router
