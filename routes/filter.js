const express = require("express")
const {getFilter} = require("../controlles/filter")
const router = express.Router()

router.get('/', getFilter)

module.exports = router
