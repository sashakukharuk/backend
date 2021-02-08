const express = require("express")
const bodyParser = require("body-parser")
const issuesRouter = require("./routes/issues")
const filterRouter = require("./routes/filter")
const stepsRouter = require("./routes/steps")
const Logger = require("./logger/logger")
const {asyncLocalStorage} = require("./async-storage")
require("dotenv").config()

const app = express()

app.use((req, res, next) => {
    const traceId = req.headers['x-request-id'] || String(Date.now())
    asyncLocalStorage.run(new Map(), () => {
        Logger.init(traceId)
        next()
    })
})

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(require('cors')())

app.use('/api/issues', issuesRouter)
app.use('/api/filter', filterRouter)
app.use('/api/step', stepsRouter)

module.exports = app
