
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const err = document.querySelector('#err')
const msg = document.querySelector('#msg')

//
//

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    
    err.textContent = '....'
    msg.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                err.textContent = data.error

            } else {
                err.textContent = data.Location +"   "+ data.Temprature
                msg.textContent = data.Forecast

            }
        })
    })

})