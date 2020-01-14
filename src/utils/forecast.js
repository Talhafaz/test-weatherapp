const request = require('request')
const https = require('https')
const geocode = require('./geocode')


const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/97e0b44048c13a18c956331eef3eae73/' + lat + ',' + long + '?units=si'
    request({url, json: true }, (error, {body}) => {
        if (error) {
            callback('unable to connect to weather service...', undefined);
        }
        else if (body.error) {
            callback(console.log(body.error), undefined)
        }

        else {
            callback(undefined, {
                temp: body.currently.temperature +' degrees ',
                summary: body.daily.data[0].summary
            })
        }

    })

}
module.exports = forecast
