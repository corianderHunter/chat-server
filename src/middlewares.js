const { packageData } = require('./const');

module.exports.dataHandler = (package, next) => {
    const { data, type } = package;
    console.log(data, type);
    console.log(package, 'dataHandler');
    if (data === undefined) {
        // next(package);
        next();
    } else {
        // next(packageData(data, type));
        next();
    }
};
