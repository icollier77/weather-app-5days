$(function () {
    const apiKey = 'cd37f59da5ea1678108b4a3eacf1b443';
    // get cities from local storage
    getFromLocalStorage();
    // add event listener on history buttons
    checkHistoryButton(apiKey);
    });
    // when new city is searched for
    $("#search-button").click(function (event) {
        event.preventDefault();
        clearPrevious(); // clear previous data
        const cityName = getProperName($('#search-input'));  // extract city from the input field & format
        if (cityName == "") {       // make sure the search field is not empty
            alert("Please add a location!");
            return;
        } else {
        // get weather
        // !why is this required again? can't pass through
        const apiKey = 'cd37f59da5ea1678108b4a3eacf1b443';
        getWeather(cityName, apiKey);
        };
})

// ----- FUNCTION TO GET CITIES FROM LOCAL STORAGE ------
function getFromLocalStorage() {
    const cityList = JSON.parse(localStorage.getItem('savedCitiesList'));
    if (cityList) {
        $.each(cityList, (i) => {
            addCityBtn(cityList[i]);
        })
    }
}

// ------ FUNCTION TO CLEAR PREVIOUS DATA ---------
function clearPrevious() {
    $('#today').empty();
    $('#forecast').empty();
}

// ------- FUNCTION TO CLEAN AND TRANSFORM CITY NAME --------
function getProperName(input) {
    const properName = input.val().trim().toLowerCase().replace(/\b[a-z]/g, function (txtVal) {   // code from option 4 in https://www.smartherd.com/convert-text-cases-using-jquery-without-css/
        return txtVal.toUpperCase();
    });
    return properName;
}

// ------ FUNCTION TO CHECK GEO DATA AND CASCADE FETCH REQUESTS FOR WEATHER DATA ------
async function getWeather(location, key) {
    // clear the input field
    $('#search-input').val('');
    try {
        // Fetch geo data
        const geoQueryUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${key}`;
        const res = await fetch(geoQueryUrl);
        const data = await res.json();
        // Add city to search history (button)
        addCityBtn(location);
        // Add to local storage
        addToLocalStorage(location);
        // Fetch weather data
        const weatherQueryUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&appid=${key}&units=metric`;
        getWeatherData(weatherQueryUrl, location);
    } catch (err) {
        alert("Invalid location!");
        console.log("ERROR with GEO data:", err);
    }
}

// ----- FUNCTION TO ADD CITY TO HISTORY -------------------
function addCityBtn(location) {
    const lastCity = $('<button>').text(location).addClass('btn btn-secondary mb-2 cityButton').attr('data-location', location);
    $('#history').append(lastCity);
}

// ----- FUNCTION TO ADD TO LOCAL STORAGE --------
function addToLocalStorage(location) {
    const cityList = JSON.parse(localStorage.getItem('savedCitiesList')) || []; // extract items array from local storage or create it
    cityList.push(location); // add city to the array
    localStorage.setItem('savedCitiesList', JSON.stringify(cityList)); // convert to json and add to local storage
}
// ------- FUNCTION TO GET WEATHER DATA AND DISPLAY ----------
async function getWeatherData(url, location) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        // ---- Create new html elements and add today weather from fetched data ----
        const currentIconCode = data.list[0].weather[0].icon;
        const currentIconSource = `http://openweathermap.org/img/wn/${currentIconCode}@2x.png`;
        const currentIcon = $('<img>').attr({ src: currentIconSource, width: "50px", height: "auto" });
        const todayDt = dayjs().format('DD/M/YYYY');
        // ! why can't add icon in the header?
        const cityHeader = $('<h4>').text(`${location} (${todayDt})`);
        const todayTemp = $('<p>').text(`Temperature: ${Math.round(data.list[0].main.temp)}°C`);
        const feelsLike = $('<p>').text(`Feels like: ${Math.round(data.list[0].main.feels_like)}°C`);
        const todayWind = $('<p>').text(`Wind: ${Math.round(data.list[0].wind.speed)} m/s`);
        const todayHumidity = $('<p>').text(`Humidity: ${data.list[0].main.humidity}%`);
        $('#today').append(cityHeader, currentIcon, todayTemp, feelsLike, todayWind, todayHumidity);  // add new elements with today's weather
        $('#today').css({border: '1px solid #2D3E50', padding: '10px'});
        // ------ Extract forecast data and create cards ------
        // create an array of data objects for noon of each day
        const noonArray = data.list.filter(item => {
            return item.dt_txt.includes("12:00:00");
        });
        $.each(noonArray, (i) => {
            let fullDate = noonArray[i].dt_txt;   // extract timestamp for each item
            // based on https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDate
            let dayObj = new Date(fullDate);    // create data object from the timestamp and extract day only
            const dayOnly = dayObj.getDate();
            const todayDay = dayjs().format('DD');
            if (todayDay != dayOnly) {      // get all days after today
                var arrayOfDate = fullDate.split(" ");   // split the timestamp into date and time
                // get the date only and rearrange date using code snippet 6 from https://stackoverflow.com/questions/45271493/rearrange-date-format-jquery-or-javascript
                let futureDate = arrayOfDate[0].replace(/^(\d{4})-(\d{2})-(\d{2})$/, "$3-$2-$1");
                // create new card with forecast weather and display
                let cardDate = $('<h5>').text(futureDate);
                let iconCode = noonArray[i].weather[0].icon.replace('n', 'd'); // replace 'n' with 'd' in the icon code in the API to obtain the day icon (issue on the API side)
                let iconSource = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
                let cardIcon = $('<img>').attr({ src: iconSource, width: "50px", height: "auto" });
                let cardTemp = $('<p>').text(`Temp: ${Math.round(noonArray[i].main.temp)}°C`);
                let cardWind = $('<p>').text(`Wind: ${Math.round(noonArray[i].wind.speed)} m/s`);
                let cardHumidity = $('<p>').text(`Humidity: ${noonArray[i].main.humidity}%`);
                // ! how to make card responsive for mobile screen?
                let newCard = $('<div>').addClass('card').css({padding: '10px', backgroundColor: '#2D3E50', color: '#FEFEFE'});
                newCard.append(cardDate, cardIcon, cardTemp, cardWind, cardHumidity);
                let cardCol = $('<div>').addClass('col');
                cardCol.append(newCard);
                $('#forecast').append(cardCol);
            }
        })
    } catch (err) {
        alert("Issues with obtaining weather data!")
        console.log("ERROR with WEATHER data!", err);
    }
}

// ----- EVENT LISTENER ON CITY BUTTONS WITH PREVIOUS SEARCHES -----
function checkHistoryButton(key) {
    $(document).off('click', '#history .cityButton').on('click', '#history .cityButton', function (e) {
        e.preventDefault();
        // clear previous data
        clearPrevious();
        let locationName = $(this).data('location');
        // fetch data and update screen
        recallHistoryCity(locationName, key);
    })
}

// ------- FUNCTION TO PULL WEATHER DAY FOR CITY BUTTON ------
async function recallHistoryCity(location, key) {
    try {
        const historyGeoQueryUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${key}`;
        const res = await fetch(historyGeoQueryUrl);
        const data = await res.json();
        const newWeatherQueryUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&appid=${key}&units=metric`;
        getWeatherData(newWeatherQueryUrl, location);
        } catch (err) {
            alert("Please enter a valid location!");
            console.log("ERROR with GEO data:", err);
        }
}

// ---------- ASSIGN CSS STYLING TO HTML ELEMENTS -----------------
// add gradient color for the header
$('.weather-header').css({background: 'linear-gradient(to left, #200C4F, 70%, #3361BA)'});
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