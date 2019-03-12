'use strict'

function generateUrlPath(value){
    var result = value.replace(/\s/g, "-").toLowerCase();
    return result;
}

module.exports = {
    generateUrlPath
}