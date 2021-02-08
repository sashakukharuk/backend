module.exports.createLevelsArray = (pointY, pointX) => {
    const arr = []
    for (let y = 0; y < pointY.length; y++) {
        arr.push([])
        for (let x = 0; x < pointX.length; x++) {
            arr[y].push([])
        }
    }
    return arr
}

module.exports.createPositionsPoint = (arr) => {
    return arr.reduce((obj, value, idx) => {
        obj[value.name] = idx
        return obj
    }, {})
}

