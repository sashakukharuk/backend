const errorHandler = require("../middleware/error")
const Logger = require("../logger/logger")
const moment = require("moment")
const mysql = require("mysql")

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

// db.connect((err) => {
//     if(err) Logger.get().info(err)
//     Logger.get().info('Database connected')
// })

module.exports.getUserInfo = async (req, res) => {
    const sub = req.params.sub
    await db.query("SELECT * FROM `users` WHERE user_sub =?", [sub], async (err, result) => {
        try {
            if (result) {
                res.status(200).json(result[0])
            } else {
                await db.query("INSERT INTO `users` SET ?", {user_sub: sub}, async (err) => {
                    if(err) Logger.get().info(err)
                    await db.query("SELECT * FROM `users` WHERE user_sub =?", [sub],  (err, result) => {
                        if(err) Logger.get().info(err)
                        res.status(200).json(result[0])
                    })
                })
            }
        } catch (err) {
            errorHandler(res, err)
        }
    })
}

module.exports.stepLink = async (req, res) => {
    const {link, userInfo} = req.body
    await db.query("INSERT INTO `step_link` SET ?", {link, user_id: userInfo.id, date: moment(Date.now()).format('YYYY-MM-DD')}, (err, result) => {
        try {
            res.status(200).json(result)
        } catch (err) {
            errorHandler(res, err)
        }
    })
}

module.exports.stepChangeFilter = async (req, res) => {
    const {jql, userInfo} = req.body
    await db.query("INSERT INTO `change_filter` SET ?", {jql, user_id: userInfo.id, date: moment(Date.now()).format('YYYY-MM-DD')}, (err, result) => {
        try {
            res.status(200).json(result)
        } catch (err) {
            errorHandler(res, err)
        }
    })
}

module.exports.stepGenerationTable = async (req, res) => {
    const {userInfo} = req.body
    await db.query("INSERT INTO `generation_table` SET ?", {user_id: userInfo.id, date: moment(Date.now()).format('YYYY-MM-DD')}, (err, result) => {
        try {
            res.status(200).json(result)
        } catch (err) {
            errorHandler(res, err)
        }
    })
}

module.exports.stepError = async (req, res) => {
    const {error, userInfo} = req.body
    await db.query("INSERT INTO `errors` SET ?", {error, user_id: userInfo.id, date: moment(Date.now()).format('YYYY-MM-DD')}, (err, result) => {
        try {
            res.status(200).json(result)
        } catch (err) {
            errorHandler(res, err)
        }
    })
}
