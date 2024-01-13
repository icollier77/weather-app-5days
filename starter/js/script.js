$(function(){
    const apiKey = 'cd37f59da5ea1678108b4a3eacf1b443';
    const todayDt = dayjs().format('DD/M/YYYY');
    const todayNewFormat = dayjs().format('YYYY-MM-DD');
    // !print out today's date in same format as used by API
    console.log(todayNewFormat);
    // add click listener on button
    $("#search-button").click(function(event) {
        event.preventDefault();
        // extract city from the input field
        const cityName = $('#search-input').val().trim();
        // make sure city name is in Proper Case
        // code from option 4 in https://www.smartherd.com/convert-text-cases-using-jquery-without-css/
        const properCaseCityName = cityName.toLowerCase().replace(/\b[a-z]/g, function(txtVal) {
            return txtVal.toUpperCase();
        });
        // get city's latitude and longitude
        const geoQueryUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`;
        fetch(geoQueryUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // fetch weather data
            const weatherQueryUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&appid=${apiKey}&units=metric`;
            // !print out the query url
            console.log(weatherQueryUrl);
            getWeatherData();

            async function getWeatherData() {
                try {
                    const response = await fetch(weatherQueryUrl);
                    const data = await response.json();
                    console.log(data);
                    let cityHeader = $('<h4>').text(`${properCaseCityName} (${todayDt})`);
                    let todayTemp = $('<p>').text(`${Math.round(data.list[0].main.temp)}°C`);
                    let todayWind = $('<p>').text(`${Math.round(data.list[0].wind.speed)} m/s`);
                    let todayHumidity = $('<p>').text(`${data.list[0].main.humidity}%`);
                    // clear today's display and add today weather
                    $('#today').empty();
                    $('#today').append(cityHeader, todayTemp, todayWind, todayHumidity);
                    // add search city to history
                    const lastCity = $('<button>').text(properCaseCityName);
                    $('#history').append(lastCity);
                    // TODO: add delegated click listener on #history to fetch, add today's weather and forecast
                    console.log(data.list[0].dt_txt);
                    // print out 
                    try {
                        const dateArr = data.list;
                        $.each(dateArr, (i) => {
                            let fullArrDate = dateArr[i].dt_txt;
                            // !print out the full date and time as used in API
                            console.log(fullArrDate);

                            let dayObj = new Date(fullArrDate);
                            const dayOnly = dayObj.getDate();
                            // !print out just the day from the time stamp in API
                            console.log(dayOnly);
                        })
                        } catch(error) {
                            console.log("Error:", error);
                        }
                    } catch(err) {
                        console.log("ERROR!", err);
                    }
                }

            // fetch(weatherQueryUrl)
            // .then(function (response) {
            // return response.json()
            // })
            // .then(function (data) {
            // console.log(data)
            // extract today's weather
            // let cityHeader = $('<h4>').text(`${properCaseCityName} (${todayDt})`);
            // let todayTemp = $('<p>').text(`${Math.round(data.list[0].main.temp)}°C`);
            // let todayWind = $('<p>').text(`${Math.round(data.list[0].wind.speed)} m/s`);
            // let todayHumidity = $('<p>').text(`${data.list[0].main.humidity}%`);
            // // clear today's display and add today weather
            // $('#today').empty();
            // $('#today').append(cityHeader, todayTemp, todayWind, todayHumidity);
            // // add search city to history
            // const lastCity = $('<button>').text(properCaseCityName);
            // $('#history').append(lastCity);
            // // TODO: add delegated click listener on #history to fetch, add today's weather and forecast
            // console.log(data.list[0].dt_txt);
            // // const 
            // try {
            //     const dateArr = data.list;
            //     $.each(dateArr, (i) => {
            //         let fullArrDate = dateArr[i].dt_txt;
            //         console.log(fullArrDate);
            //         let dayObj = new Date(fullArrDate);
            //         const dayOnly = dayObj.getDate();
            //         console.log(dayOnly);
            //     })
            // } catch(error) {
            //     console.log("Error:", error);
            // }
            
            // todo: extract 5 day forecast
            // day 1: 
            // todo: clear previous and display forecast
            
            })

        })
    })
// })
