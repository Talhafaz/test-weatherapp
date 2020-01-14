const request = require('request')


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoidGFsaGFmYWl6IiwiYSI6ImNrNWMwdmpjaTAzNGkzZ3FmN2hrNWd2OHQifQ.jvf33WVdekIXdqCqIwPSoQ&limit=1';
    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('unable to connect to location service...', undefined);
        }
        else if (body.features.length === 0) {
            callback('error finding location', undefined)
        }
        else {
            callback(undefined, {
                long: body.features[0].center[0],
                lat: body.features[0].center[1],
                loc: body.features[0].place_name
            })
        }
    })
}



module.exports = geocode;