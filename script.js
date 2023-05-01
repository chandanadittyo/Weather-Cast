import { background } from "./data.js";

export function locationName() {
  let searchBox = document.getElementById("search-box").value;

  // Check if search box is empty
  if (searchBox === "") {
    return;
  }

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${searchBox}&units=metric&APPID=59bc0f33fb9a9b0bbf4d530758d78683`
  )
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("city-name").innerText = data.name;
      document.getElementById("temperature").innerText = data.main.temp;
      const temperatureElement = document.getElementById("parameter");
      temperatureElement.innerHTML = "&#8451;";
      const humidity = data.main.humidity;
      document.getElementById("lead").innerText = data.weather[0].description;
      document.getElementById("humidity").innerText = `Humidity: ${humidity}%`;

      document.getElementById(
        "feels_like"
      ).innerText = `Feels Like : ${data.main.feels_like}`;
      const weatherIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      const iconSrc = document.getElementById("weather-icon");
      iconSrc.setAttribute("src", weatherIcon);
      const weather = data.weather[0].main;
      const condition = data.weather[0].icon;

      console.log(humidity);
      const images = background.find((img) => img.id === weather);
      const conditionIcon = background.find(
        (icon) => icon.condition === condition
      );

      if (images && conditionIcon) {
        document.body.style.backgroundImage = `url(${images.img})`;
      }
    });
}
