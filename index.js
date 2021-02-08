const app = require('./app')
const PORT = process.env.PORT || 5000
const Logger = require('./logger/logger')

app.listen(PORT, () => Logger.get().info('Server running no port:' + PORT))
