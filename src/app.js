const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 1234

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, 'views')
const partialsPath = path.join(__dirname, 'partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'owner'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Enter Address'
        })
    }

    else {
        geocode(req.query.address, (error, { lat, long, loc } = {}) => {
            if (error) {
                return res.send({
                    error: 'Invaild Location'
                })
            }
            forecast(lat, long, (error, { temp, summary } = {}) => {
                if (error) {
                    return res.send({
                        error: 'ERROR'
                    })

                }
                else {
                    res.send({
                        Location: loc,
                        Temprature: temp,
                        Forecast: summary
                    })
                }
            }) 
        })
    }
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'owner'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'owner'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'owner',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Starting......')
})