module.exports.filter = (arr) => {
    const o = Object.create(null)
    const newArr = []
    for (const key of arr) {
        if (!o[key.name]) {
            o[key.name] = true
            newArr.push(key)
        }
    }
    return newArr
}
module.exports.gradation = (arrFilter, arr) => {
    return arrFilter.map(filter => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].name === filter) {
                return arr[i]
            }
        }
    }).filter(item => item !== undefined)
}

