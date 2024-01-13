$(function(){
    const apiKey = 'cd37f59da5ea1678108b4a3eacf1b443';
    const todayDt = dayjs().format('DD/M/YYYY');
    const todayNewFormat = dayjs().format('YYYY-MM-DD');
    const todayDay = dayjs().format('DD');

    // add click listener on button
    $("#search-button").click(function(event) {
        event.preventDefault();
        // clear previous data
        $('#today').empty();
        $('#forecast').empty();

        // extract city from the input field
        const cityName = $('#search-input').val().trim();
        // make sure city name is in Proper Case
        // code from option 4 in https://www.smartherd.com/convert-text-cases-using-jquery-without-css/
        const properCaseCityName = cityName.toLowerCase().replace(/\b[a-z]/g, function(txtVal) {
            return txtVal.toUpperCase();
        });
        // clear the input field
        $('#search-input').val('');
        // fetch city's latitude and longitude
        const geoQueryUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`;
        getGeoData();

        async function getGeoData() {
            try {
                // fetch geo data
                const res = await fetch(geoQueryUrl);
                const data = await res.json();
                // fetch weather data
                const weatherQueryUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&appid=${apiKey}&units=metric`;
                getWeatherData();
                

                // function to get weather data
                async function getWeatherData() {
                    try {
                        const response = await fetch(weatherQueryUrl);
                        const data = await response.json();
    
                        // create new html elements and add content from fetched data
                        let cityHeader = $('<h4>').text(`${properCaseCityName} (${todayDt})`);
                        let todayTemp = $('<p>').text(`${Math.round(data.list[0].main.temp)}°C`);
                        let todayWind = $('<p>').text(`${Math.round(data.list[0].wind.speed)} m/s`);
                        let todayHumidity = $('<p>').text(`${data.list[0].main.humidity}%`);
                        
                        // add new elements with today's weather
                        $('#today').append(cityHeader, todayTemp, todayWind, todayHumidity);
                        
                        // add search city to history
                        const lastCity = $('<button>').text(properCaseCityName);
                        $('#history').append(lastCity);
    
                        // TODO: add delegated click listener on #history to fetch, add today's weather and forecast
                        
                        // 
                        try {
                            // create array of forecast data from the fetch data for clarity
                            const dateArr = data.list;
                            // loop through the array to identify weather data for noon of each day
                            $.each(dateArr, (i) => {
                                // extract timestamp for each item
                                let fullArrDate = dateArr[i].dt_txt;
                                // create data object from the timestamp and extract day only
                                // based on https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDate
                                let dayObj = new Date(fullArrDate);
                                const dayOnly = dayObj.getDate();
                                // get all days after today
                                if (todayDay != dayOnly) {
                                    // split the timestamp into date and time
                                    var arrayOfDate = fullArrDate.split(" ");
                                    // get weather data for midday of each day after today
                                    if (arrayOfDate[1] === "12:00:00") {
                                        // get the date only
                                        let futureDate = arrayOfDate[0];
                                        // rearrange date using code snippet 6 from https://stackoverflow.com/questions/45271493/rearrange-date-format-jquery-or-javascript
                                        let futureDataFormatted = futureDate.replace(/^(\d{4})-(\d{2})-(\d{2})$/, "$3-$2-$1");
                                        // create new card with forecast weather and display
                                        let cardDate = $('<h6>').text(futureDataFormatted);
                                        let cardTemp = $('<p>').text(`Temp: ${Math.round(dateArr[i].main.temp)}°C`);
                                        let cardWind = $('<p>').text(`Wind: ${Math.round(dateArr[i].wind.speed)} m/s`);
                                        let cardHumidity = $('<p>').text(`Humidity: ${dateArr[i].main.humidity}%`);
                                        let newCard = $('<div>').addClass('card');
                                        newCard.append(cardDate, cardTemp, cardWind, cardHumidity);
                                        $('#forecast').append(newCard);
                                    }
                                }
                            })
                            } catch(error) {
                                console.log("Error:", error);
                            }
                        } catch(err) {
                            console.log("ERROR!", err);
                        }
                }

            } catch(err) {
                console.log("ERROR WITH GEO DATA:", err);
            }
        }            
    })
})

