const DATA_TYPES = {
    NUMBER: 'number',
    STRING: 'String',
    OBJECT: 'object',
    DATE: 'date'
}

const DATA_TYPES_FORMAT = {
    [DATA_TYPES.NUMBER]: Number,
    [DATA_TYPES.STRING]: String,
    [DATA_TYPES.OBJECT]: (value) => {
        try {
            return JSON.parse(value)
        } catch (error) {
            return value.toString()
        }
    },
    [DATA_TYPES.DATE]: (value) => new Date(value)
}

module.exports.packageData = (data, type) => {
    return type ? DATA_TYPES_FORMAT[type || 'string'](data) : data
}