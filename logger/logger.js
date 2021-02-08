const {asyncLocalStorage} = require("../async-storage")

const logger = require("pino")({
    prettyPrint: true
})

module.exports = {
     init(traceId) {
        const store = asyncLocalStorage.getStore()
        const childLogger = logger.child({
            traceId
        })
        store.set('logger', childLogger)
    },

     get() {
        const store = asyncLocalStorage.getStore()
        const childLogger = store ? store.get('logger') : null
        return childLogger ? childLogger : logger
    }
}
