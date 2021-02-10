const app = require('./app')
const PORT = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000
const Logger = require('./logger/logger')

app.listen(PORT, () => Logger.get().info('Server running no port:' + PORT))
