const {
    packageData
} = require('./const')

module.exports.dataHandler = (package, next) => {
    const {
        data,
        type
    } = package
    if (data === undefined) {
        next(package)
    } else {
        next(packageData(data, type));
    }
}