# Module 8 Challenge: 5-day Weather Forecast App
Assignment 8 of the [Front-End Web Dev bootcamp][bootcamp-url] to create a weather app with 5-day forecast.


****
<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
<!-- Webpage icon -->
<a href="https://icollier77.github.io/weather-app-5days/" target="_blank">
    <img src="./images/planner.png" alt="Logo" width="80" height="80">
  </a>

<h1 align="center">Day Planner</h1>

  <p align="center">A web app to plan work day, updated dynamically with persistent storage.</p>
    <!-- links to deployment -->
    <a href="https://icollier77.github.io/day-scheduler-app/" target="_blank">Day Planner app</a>
    ·
    <a href="https://github.com/icollier77/day-scheduler-app" target="_blank">GitHub repo</a>
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
        <li><a href="#jquery-30">jQuery 3.0</a></li>
        <li><a href="#nested-loops">Nested loops</a></li>
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
The goal of this project is to practice jQuery, web APIs (specifically [Day.js][dayjs-url]) and local storage.

### Project Specifications

<p>The tasks for this challenge are outlined in the following requirements.</p>

<p><b>The day planner app must have these features:</b></p>
<ol>
  <li>Display the current day at the top of the calender when a user opens the planner.</li>
  <li>Present timeblocks for standard business hours when the user scrolls down.</li>
  <li>Color-code each timeblock based on past, present, and future when the timeblock is viewed.</li>
  <li>Allow a user to enter an event when they click a timeblock.</li>
  <li>Save the event in local storage when the save button is clicked in that timeblock.</li>
  <li>Persist events between refreshes of a page.</li>
  
</ol>

### Sample App

<p>We were provided with the original demo of the day planner app:

![inital screenshot][initial-img]
</p>

### Built With

We were provided with some starter files in html and css, which I further updated.

The project was built with:

[![HTML][html-badge]][html-url] 
[![CSS][css-badge]][css-url] 
[![JavaScript][js-badge]][js-url] 
[![jQuery][jquery-badge]][jquery-url]
[![Day.js][dayjs-badge]][dayjs-url]
[![Bootstrap][boostrap-badge]][bootstrap-url]


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- The build process -->
## Development

The development of this project was largely about understanding the logic of required steps, so it required some thinking.

I ran into a few blocks related to Bootstrap and jQuery. During the class on 5 Jan, I asked [Martin William][martin-url], the TA in my [bootcamp][bootcamp-url] who helped me figure those out.

Overall, it was an interesting project: seemingly easy but at times challenging. Luckily, I was able to leverage the functionality for storing and extracting data in local storage from my previous project, a [quiz app][quiz-app-url].

### jQuery 3.0

The common advice for jQuery is to include `$(document).ready(function(){}` at the start of the code. However, the [documentation for jQuery 3.0][jquery-ready-url] specifies that this synthax is deprecated and is **no longer necessary**.

The **recommended way of calling** is simply `$(function(){})`. This is why I used this more simplified code in my script.

### Nested loops

The biggest challenge I encountered (in terms of impact on the code quality) is the issue of a nested loop which would negatively affect the Big O notation of the code.

* I have researched this topic further and found the answer that it really depends on the size of dataset. For small datasets it is entirely acceptable to have nested loops, as noted in this [discussion on StackOverflow][stackoverflow-url].
* Further, [another article][medium-url] suggested that a nested loop can be replaced with a more optimized code but at the expense of code readability, therefore making the code less "clean".
* Finally, it seems that one of the ways to replace a nested loop involves a [hashmap][hashmap-url], and I am not yet familiar with this data structure.

For all the reasons above, I decided to keep the nested loop in my code.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Deployed project -->
## Deployed project

The project is now live.

### Deployed application

The deployed page looks like this:

![Deployed page][deployed-gif]

### Links to deployed project

You can find the Day Planner app and its corresponding code here:

- [ ] [Day planner app][deployed-url]
- [ ] [Project repo][repo-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

#### Credit:
<details>
    <summary>Attribution</summary>

- <a href="https://www.flaticon.com/free-icons/journal" title="journal icons" target="_blank">Journal icons created by Freepik - Flaticon</a>

<!-- MARKDOWN LINKS & IMAGES -->
[deployed-gif]: ./images/deployed-page.gif

[deployed-url]: https://icollier77.github.io/day-scheduler-app/

[repo-url]: https://github.com/icollier77/day-scheduler-app

[initial-img]: ./images/05-third-party-apis-homework-demo.gif

[html-badge]: https://img.shields.io/badge/HTML-e34c26?style=for-the-badge&logo=html5&logoColor=white
[css-badge]: https://img.shields.io/badge/CSS-FF8A27?style=for-the-badge&logo=CSS3
[js-badge]: https://img.shields.io/badge/JavaScript-F0DB4F?style=for-the-badge&logo=Javascript&logoColor=323330
[dayjs-badge]: https://img.shields.io/badge/Day.js-ff8849?style=for-the-badge&logo=dayjs&logoColor=white
[jquery-badge]: https://img.shields.io/badge/jQuery-0769ad?style=for-the-badge&logo=jQuery&logoColor=white
[boostrap-badge]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white

[html-url]: https://www.w3schools.com/html/
[css-url]: https://www.w3schools.com/css/default.asp
[js-url]: https://www.w3schools.com/js/default.asp
[dayjs-url]: https://day.js.org/
[jquery-url]: https://jquery.com/
[bootstrap-url]: https://getbootstrap.com/

[bootcamp-url]: https://www.edx.org/boot-camps/coding/skills-bootcamp-in-front-end-web-development

[martin-url]: https://github.com/MartinSWDev

[quiz-app-url]: https://github.com/icollier77/life-in-uk-quiz

[jquery-ready-url]: https://api.jquery.com/ready/

[stackoverflow-url]: https://stackoverflow.com/questions/48411581/how-to-avoid-for-loop-inside-for-loop-in-javascript

[medium-url]: https://medium.com/geekculture/javascript-101-optimizing-your-loops-e63e49fe9a59

[hashmap-url]: https://stackoverflow.com/questions/48589552/whats-the-best-way-to-optimize-these-nested-for-loops-used-to-create-a-hashmap