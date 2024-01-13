$(function(){
    const apiKey = 'cd37f59da5ea1678108b4a3eacf1b443';
    const todayDt = dayjs().format('DD/M/YYYY');
    // add click listener on button
    $("#search-button").click(function(event) {
        event.preventDefault();
        // 1 extract city from the input field
        const cityName = $('#search-input').val().trim();
        // get city's latitude and longitude
        const geoQueryUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`;
        fetch(geoQueryUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // fetch weather data
            const weatherQueryUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&units=metric&appid=${apiKey}`;
            fetch(weatherQueryUrl)
            .then(function (response) {
            return response.json()
            })
            .then(function (data) {
            console.log(data)
            // extract today's weather
            let cityHeader = $('<h4>').text(`${cityName} (${todayDt})`);
            let todayTemp = $('<p>').text(`${Math.round(data.list[0].main.temp)}°C`);
            let todayWind = $('<p>').text(`${Math.round(data.list[0].wind.speed)} m/s`);
            let todayHumidity = $('<p>').text(`${data.list[0].main.humidity}%`);
            // clear today's display and add today weather
            $('#today').empty();
            $('#today').append(cityHeader, todayTemp, todayWind, todayHumidity);
            // add search city to history
            const lastCity = $('<button>').text(cityName);
            $('#history').append(lastCity);

            })

        })
    })


})







    
    
    
    
    
    // fetch request from OpenWeather API
    // fetch(apiUrl)
    // .then(response => response.json())
    // .then(data => {
    //     // Handle the data from the API
    //     console.log(data);
    // })
    // .catch(error => {
    //     // Handle errors
    //     console.error('Error fetching data:', error);
    // });

    // 4 extract data, create a button with city name, add a listener to the button

    // 5 display current weather in the box

    // 6 add 5 cards with 5 day forecast

    // 7 add a listener to the buttons to run fetch request and update 
    // })