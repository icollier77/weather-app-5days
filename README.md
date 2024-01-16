# Module 8 Challenge: 5-day Weather Forecast App
Assignment 8 of the [Front-End Web Dev bootcamp][bootcamp-url] to create a weather app with 5-day forecast.


****
<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
<!-- Webpage icon -->
<a href="https://icollier77.github.io/weather-app-5days/" target="_blank">
    <img src="./assets/images/weather-forecast.png" alt="Logo" width="80" height="80">
  </a>

<h1 align="center">5-Day Weather Forecast App</h1>

  <p align="center">A web app to show current weather and 5-day forecast for any city searched by a user.</p>
    <!-- links to deployment -->
    <a href="https://icollier77.github.io/weather-app-5days/" target="_blank">Weather app</a>
    ·
    <a href="https://github.com/icollier77/weather-app-5days" target="_blank">GitHub repo</a>
    ·
  <br>
  <br>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#project-goal">Project Goal</a></li>
        <li><a href="#project-specifications">Project Specifications</a></li>
        <li><a href="#sample-app">Sample App</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#development">Development</a></li>
      <ul>
        <li><a href="#change-location-into-proper-case">Change location into Proper Case</a></li>
        <li><a href="#re-arrange-date-format">Re-arrange date format</a></li>
        <li><a href="#replace-one-character-with-another">Replace one character with another</a></li>
        <li><a href="#event-listener-binding">Event listener binding</a></li>
        <li><a href="#combining-filter-and-includes-methods">Combining Filter and Includes methods</a></li>
        <li><a href="#block-action-if-location-invalid">Block action if location invalid</a></li>
        <li><a href="#issues-with-the-midday-logic">Issues with the midday logic</a></li>
      </ul>
    <li><a href="#deployed-project">Deployed Project</a></li>
      <ul>
        <li><a href="#deployed-application">Deployed Application</a></li>
        <li><a href="#links-to-deployed-project">Links to Deployed Project</a></li>
      </ul>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

### Project Goal
The goal of this project is to practice web APIs (specifically [OpenWeatherAPI][open-weather-url]), jQuery, a web library like [Day.js][dayjs-url], and using local storage.

### Project Specifications

<p>The tasks for this challenge are outlined in the following requirements.</p>

<p><b>The weather app must have these features:</b></p>
<ol>
    <li>Create a weather dashboard with form inputs.</li>
    <li>When a user searches for a city they are presented with current and future conditions for that city and that city is added to the search history.</li>
    <li>When a user views the current weather conditions for that city they are presented with:</li>
    <ul>
        <li>The city name</li>
        <li>The date</li>
        <li>An icon representation of weather conditions</li>
        <li>The temperature</li>
        <li>The humidity</li>
        <li>The wind speed</li>
    </ul>
    <li>When a user view future weather conditions for that city they are presented with a 5-day forecast that displays:</li>
    <ul>
        <li>The date</li>
        <li>An icon representation of weather conditions</li>
        <li>The temperature</li>
        <li>The humidity</li>
    </ul>
    <li>When a user click on a city in the search history they are again presented with current and future conditions for that city</li>
</ol>

### Sample App

<p>We were provided with the original demo of the weather app:

![inital screenshot][initial-img]
</p>

### Built With

We were provided with a starter html file which I only slightly updated with links and code for Bootstrap modals.

I built the files in JavaScript (using jQuery) and css (leveraging Bootstrap classes to be assigned dynamically by js).

The project was built with:

[![HTML][html-badge]][html-url] 
[![CSS][css-badge]][css-url] 
[![Bootstrap][boostrap-badge]][bootstrap-url]
[![JavaScript][js-badge]][js-url] 
[![jQuery][jquery-badge]][jquery-url]
[![OpenWeatherMap API][open-weather-badge]][open-weather-url]
[![Day.js][dayjs-badge]][dayjs-url]


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- The build process -->
## Development

I have to say that it was a quite challenging assignment. I wanted to go beyond just the requirements and make sure that the visual aspects and the logic would approximate both the demo image and the real world. To achieve this, I searched for solutions across the web and sometimes leveraged AI.

### Change location into Proper Case

When a user searches for a city, I wanted not only to remove unnecessary white spaces, but also make sure that the city name is always displayed in Proper Case. That is to say, if a user enters '_new york_' or '_pArIS_', these will be displayed as '_New York_' and '_Paris_' on the screen. To achieve this using jQuery, I used the code from [this blog][proper-case-url].

### Re-arrange date format

The OpenWeather API supplies the date in the format "YYYY-DD-MM hh-mm-ss" (eg. "2024-01-16 15:00:00"), whereas the demo image shows date in the format "DD/MM/YYYY". I used the following resources to achieve the date transformation:

- Rearrange date format using regex based on [code snippet 6][regex-url] from StackOverflow
- Extract just the day from the timestamp using a date object obtained using code from [this article][date-object-url]

### Replace one character with another

When extracting weather icons from the API, I realized that the API had misalignment between the time in the timestamp and the day/night code. For example, for a timestamp `"2024-01-17 09:00:00"` it has `"pod": "n"` and `"icon": "04n"` ('_n_' stands for '_night_'). I used the code in snippet 4 in [this][swap-chars-url] StackOverflow article to swap '_n_' for '_d_'.

### Event listener binding

I had an issue with multiple bindings on the event listener on buttons with search history. All my web research did not let me solve this problem. Finally, I turned to ChatGPT and it provided me with the best solution:

![ChatGPT multiple bindings][chatgpt-bindings-img]

### Combining Filter and Includes methods

To extract the forecast data for the next few days, I wanted to focus on the array items related to midday, i.e. those that contained timestamp of '12:00:00'.

Initially I used an `if` statement but realized there should be a simpler way using [`.filter`][filter-url] and [`.includes`][includes-url] methods. However, as much as I tried to devise ways to combine them, I could not do it, and I didn't find any articles online with instructions.

Finally, I asked ChatGPT and received an answer which I used in my code (lines 117-118 in [script.js][script-js-file]):

![Question to ChatGPT on how to use .filter and .includes methods to filter an array that contains timestamp of 12:00:00][chatgpt-filter-question-img]
![Answer from ChatGPT with the code that combines .filter and .includes to create a new array with the data that has the midday stamp][chatgpt-filter-answer-img]

### Block action if location invalid

I needed to find a way to prevent adding a button with a location name if the location name was invalid (eg. '_dfdfdfd_' or '_Pariz_'). I was stuck on it for quite some time, and has to consult support specialists from the [Bootcamp][bootcamp-url]. I raised the support ticket **ask-297965** and the analyst (screen name _nmendu_) helped me figure it out.

### Issues with the midday logic

My logic for extracting the records for midday had a flaw: if I check the weather in the morning, the free API provides an array with only 40 snapshots of forecast weather data, which excludes the midday of day 5. Since I do not include today's midday in the forecast, I was left with only 4 cards with forecast weather.

I discussed this with my tutor, [Benicio Lopez][benicio-lopez-url] and he helped me include a condition that checks the number of cards created, and extracts the last record in the forecast data (i.e. record #40) to be included as Day 5 forecast.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Deployed project -->
## Deployed project

The project is now live.

### Deployed application

The deployed page looks like this:

![Deployed page][deployed-gif]

### Links to deployed project

You can find the Day Planner app and its corresponding code here:

- [ ] [Weather app][deployed-url]
- [ ] [Project repo][repo-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

#### Credit:
<details>
    <summary>Attribution</summary>

- <a href="https://www.flaticon.com/free-icons/weather-forecast" title="weather forecast icons">Weather forecast icons created by Rosa Suave - Flaticon</a>

<!-- MARKDOWN LINKS & IMAGES -->
[deployed-gif]: ./assets/images/weather-app.gif

[deployed-url]: https://icollier77.github.io/weather-app-5days/

[repo-url]: https://github.com/icollier77/weather-app-5days

[initial-img]: ./assets/images/10-server-side-apis-challenge-demo.png

[html-badge]: https://img.shields.io/badge/HTML-e34c26?style=for-the-badge&logo=html5&logoColor=white
[css-badge]: https://img.shields.io/badge/CSS-FF8A27?style=for-the-badge&logo=CSS3
[js-badge]: https://img.shields.io/badge/JavaScript-F0DB4F?style=for-the-badge&logo=Javascript&logoColor=323330
[dayjs-badge]: https://img.shields.io/badge/Day.js-ff8849?style=for-the-badge&logo=dayjs&logoColor=white
[jquery-badge]: https://img.shields.io/badge/jQuery-0769ad?style=for-the-badge&logo=jQuery&logoColor=white
[boostrap-badge]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[open-weather-badge]: https://img.shields.io/badge/OpenWeather_API-d98457?style=for-the-badge

[html-url]: https://www.w3schools.com/html/
[css-url]: https://www.w3schools.com/css/default.asp
[js-url]: https://www.w3schools.com/js/default.asp
[dayjs-url]: https://day.js.org/
[jquery-url]: https://jquery.com/
[bootstrap-url]: https://getbootstrap.com/
[open-weather-url]: https://openweathermap.org/

[bootcamp-url]: https://www.edx.org/boot-camps/coding/skills-bootcamp-in-front-end-web-development

[proper-case-url]: https://www.smartherd.com/convert-text-cases-using-jquery-without-css/
[regex-url]: https://stackoverflow.com/questions/45271493/rearrange-date-format-jquery-or-javascript
[date-object-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDate
[swap-chars-url]: https://stackoverflow.com/questions/29413031/jquery-replace-character-with-another
[chatgpt-bindings-img]: ./assets/images/ChatGPT_offclickcode.png
[filter-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
[includes-url]: https://www.w3schools.com/jsreF/jsref_includes_array.asp
[chatgpt-filter-question-img]: ./assets/images/chatgpt-filter-question.png
[chatgpt-filter-answer-img]: ./assets/images/chatgpt-filter-answer.png
[script-js-file]: ./assets/js/script.js
[benicio-lopez-url]: https://github.com/Blopez811