const moment = require("moment")

module.exports.differentDate = (date) => {
    if (date) {
        const date1 = new Date(moment(date).format('M/D/YYYY'));
        const date2 = new Date(moment(Date.now()).format('M/D/YYYY'));
        // @ts-ignore
        return parseInt(Number((date2 - date1) / (1000 * 60 * 60 * 24)));
    } else {
        return 0
    }
}
