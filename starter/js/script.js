$(function(){
        
    const apiKey = 'cd37f59da5ea1678108b4a3eacf1b443';
    
    // add click listener on button
    $("#search-button").click(function(event) {
        event.preventDefault;
        // 1 extract city from the input field
        let cityName = $('#search-input').val().trim();
        console.log(cityName);
    })
})







    
    
    // 2 send fetch request to geo API and obtain city's lat and lon, save those variables
    // const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=City&appid=${apiKey}`;

    // 3 update url for forecast and fetch forecast data
    // const baseUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
    
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
// })