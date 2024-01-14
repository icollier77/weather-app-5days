$(function () {
    const apiKey = 'cd37f59da5ea1678108b4a3eacf1b443';
    const todayDt = dayjs().format('DD/M/YYYY');
    // const todayNewFormat = dayjs().format('YYYY-MM-DD');
    const todayDay = dayjs().format('DD');
    
    // add click listener on button
    $("#search-button").click(function (event) {
        event.preventDefault();
        // clear previous data
        $('#today').empty();
        $('#forecast').empty();
        // extract city from the input field
        const cityName = $('#search-input').val().trim();
        // make sure city name is in Proper Case
        const properCaseCityName = cityName.toLowerCase().replace(/\b[a-z]/g, function (txtVal) {   // code from option 4 in https://www.smartherd.com/convert-text-cases-using-jquery-without-css/
            return txtVal.toUpperCase();
        });
        // add city to search history (buttons)
        const lastCity = $('<button>').text(properCaseCityName).addClass('btn btn-secondary m-1 cityButton').attr('data-location', properCaseCityName);
        $('#history').append(lastCity);
        // clear the input field
        $('#search-input').val('');
        // run functions 
        getWeather();
        checkWeatherForCity();

        // ------ Nested function to 1) get geo data; 2) get weather data and display
        async function getWeather() {
            try {
                // 1. Fetch geo data
                const geoQueryUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`;
                const res = await fetch(geoQueryUrl);
                const data = await res.json();
                const country = data[0].country;
                console.log(country);
                // 2. Fetch weather data
                const weatherQueryUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&appid=${apiKey}&units=metric`;
                getWeatherData();
                // ------ function to get weather data --------
                async function getWeatherData() {
                    try {
                        const response = await fetch(weatherQueryUrl);
                        const data = await response.json();
                        console.log(data);
                        // 3. Create new html elements and add content from fetched data
                        let currentIconCode = data.list[0].weather[0].icon;
                        let currentIconSource = `https://openweathermap.org/img/wn/${currentIconCode}@2x.png`;
                        let currentIcon = $('<img>').attr({ src: currentIconSource, width: "50px", height: "auto" });
                        let cityHeader = $('<h4>').text(`${properCaseCityName} (${todayDt})`)
                        let todayTemp = $('<p>').text(`Temperature: ${Math.round(data.list[0].main.temp)}°C`);
                        let feelsLike = $('<p>').text(`Feels like: ${Math.round(data.list[0].main.feels_like)}°C`);
                        let todayWind = $('<p>').text(`Wind: ${Math.round(data.list[0].wind.speed)} m/s`);
                        let todayHumidity = $('<p>').text(`Humidity: ${data.list[0].main.humidity}%`);
                        $('#today').append(cityHeader, currentIcon, todayTemp, feelsLike, todayWind, todayHumidity);  // add new elements with today's weather
                        $('#today').css({border: '1px solid grey', padding: '10px'});

                        // ------ 4. Extract forecast data and create cards ------
                        try {
                            const dateArr = data.list; // create array of forecast data from the fetch data for clarity
                            $.each(dateArr, (i) => {   // loop through the array to identify weather data for noon of each day
                                let fullDate = dateArr[i].dt_txt;   // extract timestamp for each item
                                // based on https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDate
                                let dayObj = new Date(fullDate);    // create data object from the timestamp and extract day only
                                const dayOnly = dayObj.getDate();
                                if (todayDay != dayOnly) {      // get all days after today
                                    var arrayOfDate = fullDate.split(" ");   // split the timestamp into date and time
                                    if (arrayOfDate[1] === "12:00:00") {     // get weather data for midday of each day after today
                                        let futureDate = arrayOfDate[0];    // get the date only
                                        // rearrange date using code snippet 6 from https://stackoverflow.com/questions/45271493/rearrange-date-format-jquery-or-javascript
                                        let futureDataFormatted = futureDate.replace(/^(\d{4})-(\d{2})-(\d{2})$/, "$3-$2-$1");
                                        // create new card with forecast weather and display
                                        let cardDate = $('<h5>').text(futureDataFormatted);
                                        let iconCode = dateArr[i].weather[0].icon.replace('n', 'd'); // replace 'n' with 'd' in the icon code in the API to obtain the day icon (issue on the API side)
                                        let iconSource = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
                                        let cardIcon = $('<img>').attr({ src: iconSource, width: "50px", height: "auto" });
                                        let cardTemp = $('<p>').text(`Temp: ${Math.round(dateArr[i].main.temp)}°C`);
                                        let cardWind = $('<p>').text(`Wind: ${Math.round(dateArr[i].wind.speed)} m/s`);
                                        let cardHumidity = $('<p>').text(`Humidity: ${dateArr[i].main.humidity}%`);
                                        let newCard = $('<div>').addClass('card');
                                        newCard.append(cardDate, cardIcon, cardTemp, cardWind, cardHumidity);
                                        $('#forecast').append(newCard);
                                    }
                                }
                            })
                        } catch (error) {
                            console.log("Error:", error);
                        }
                    } catch (err) {
                        alert("Issues with obtaining weather data!")
                        console.log("ERROR with WEATHER data!", err);
                    }
                }
            } catch (err) {
                alert("Please enter a valid location!");
                console.log("ERROR with GEO data:", err);
            }
        }

        // ----- EVENT LISTENER ON BUTTONS WITH PREVIOUS SEARCHES -----
        function checkWeatherForCity() {
            $(document).off('click', '#history .cityButton').on('click', '#history .cityButton', function (e) {
                e.preventDefault();
                // clear previous data
                $('#today').empty();
                $('#forecast').empty();
                let locationName = $(this).data('location');
                // fetch data and update screen
                recallHistoryCity();
                async function recallHistoryCity() {
                    try {
                        const historyGeoQueryUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${locationName}&appid=${apiKey}`;
                        const res = await fetch(historyGeoQueryUrl);
                        const data = await res.json();
                        const newWeatherQueryUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&appid=${apiKey}&units=metric`;
                        getWeatherData();
                        // ------ function to get weather data --------
                        async function getWeatherData() {
                            try {
                                const response = await fetch(newWeatherQueryUrl);
                                const data = await response.json();
                                // 3. Create new html elements and add content from fetched data
                                let currentIconCode = data.list[0].weather[0].icon;
                                let currentIconSource = `https://openweathermap.org/img/wn/${currentIconCode}@2x.png`;
                                let currentIcon = $('<img>').attr({ src: currentIconSource, width: "50px", height: "auto" });
                                let cityHeader = $('<h4>').text(`${locationName} (${todayDt})`);
                                let todayTemp = $('<p>').text(`Temperature: ${Math.round(data.list[0].main.temp)}°C`);
                                let feelsLike = $('<p>').text(`Feels like: ${Math.round(data.list[0].main.feels_like)}°C`);
                                let todayWind = $('<p>').text(`Wind: ${Math.round(data.list[0].wind.speed)} m/s`);
                                let todayHumidity = $('<p>').text(`Humidity: ${data.list[0].main.humidity}%`);
                                $('#today').append(cityHeader, currentIcon, todayTemp, feelsLike, todayWind, todayHumidity);  // add new elements with today's weather

                                // ------ 4. Extract forecast data and create cards ------
                                try {
                                    const dateArr = data.list; // create array of forecast data from the fetch data for clarity
                                    $.each(dateArr, (i) => {   // loop through the array to identify weather data for noon of each day
                                        let fullDate = dateArr[i].dt_txt;   // extract timestamp for each item
                                        // based on https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDate
                                        let dayObj = new Date(fullDate);    // create data object from the timestamp and extract day only
                                        const dayOnly = dayObj.getDate();
                                        if (todayDay != dayOnly) {      // get all days after today
                                            var arrayOfDate = fullDate.split(" ");   // split the timestamp into date and time
                                            if (arrayOfDate[1] === "12:00:00") {     // get weather data for midday of each day after today
                                                let futureDate = arrayOfDate[0];    // get the date only
                                                // rearrange date using code snippet 6 from https://stackoverflow.com/questions/45271493/rearrange-date-format-jquery-or-javascript
                                                let futureDataFormatted = futureDate.replace(/^(\d{4})-(\d{2})-(\d{2})$/, "$3-$2-$1");
                                                // create new card with forecast weather and display
                                                let cardDate = $('<h5>').text(futureDataFormatted);
                                                let iconCode = dateArr[i].weather[0].icon.replace('n', 'd'); // replace 'n' with 'd' in the icon code in the API to obtain the day icon (issue on the API side)
                                                let iconSource = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
                                                let cardIcon = $('<img>').attr({ src: iconSource, width: "50px", height: "auto" });
                                                let cardTemp = $('<p>').text(`Temp: ${Math.round(dateArr[i].main.temp)}°C`);
                                                let cardWind = $('<p>').text(`Wind: ${Math.round(dateArr[i].wind.speed)} m/s`);
                                                let cardHumidity = $('<p>').text(`Humidity: ${dateArr[i].main.humidity}%`);
                                                let newCard = $('<div>').addClass('card');
                                                newCard.append(cardDate, cardIcon, cardTemp, cardWind, cardHumidity);
                                                $('#forecast').append(newCard);
                                            }
                                        }
                                    })
                                } catch (error) {
                                    console.log("Error:", error);
                                }
                            } catch (err) {
                                alert("Issues with obtaining weather data!")
                                console.log("ERROR with WEATHER data!", err);
                            }
                        }
                    } catch (err) {
                        alert("Please enter a valid location!");
                        console.log("ERROR with GEO data:", err);
                    }
                }
            })
        }
        // ------- END EVENT LISTENER --------
    })
})


// ---------- ASSIGN CSS STYLING TO HTML ELEMENTS -----------------

// adjust styling for the search input field
$('#search-input').addClass('form-control rounded');
// make the search input field fit the container
$('#search-input').css({width: '100%'}); 
// make the search button div fit the container
$('.input-group-append').css({width: '100%'}); 
// assign styling to the Search button
$('#search-button').addClass('btn btn-primary mt-2').css('width','100%'); 
// make the separator line fit the parent container
$('#weather-hr').css({width: '50%', textAlign: 'left', marginLeft: '0'}); 