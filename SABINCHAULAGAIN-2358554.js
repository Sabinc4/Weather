// API key and API URL for OpenWeatherMap
const apiKey = "fc6e65b69b552fe8f0d0b11f75ffb17a";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";
// Get the search input field and search button
const searchBox = document.querySelector(".input-field");
const searchBtn = document.querySelector(".sabin button");
// Get the weather icon element
const weatherIcon = document.querySelector(".icons-image");
// Function to handle search button click or Enter key press
function searchWeather() {
  const searchedCity = searchBox.value.trim();
  if (searchedCity) {
    // Call the checkWeather function with the searched city
    checkWeather(searchedCity);

    // Reset error message
    const errorMessage = document.querySelector(".error-message");
    errorMessage.style.display = "none";
  } else {
    // Display error message if no city is entered
    const errorMessage = document.querySelector(".error-message");
    errorMessage.textContent = "Please enter a city name.";
    errorMessage.style.display = "block";
  }
}
// Add event listener for search button click
searchBtn.addEventListener("click", searchWeather);
// Add event listener for Enter key press in search input field
searchBox.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    searchWeather();
  }
});
// Function to fetch weather data and update the UI
async function checkWeather(city) {
  try {
    // Send request to OpenWeatherMap API
    const response = await fetch(`${apiUrl}&q=${city}&appid=${apiKey}`);
    const data = await response.json();
    if (data.cod === "404") {
      // City not found, display error message
      const errorMessage = document.querySelector(".error-message");
      errorMessage.textContent = "Invalid city name! Can you correct it?";
      errorMessage.style.display = "block";
      // Reset weather details
      resetWeatherDetails();
      return;
    }
    // Update weather details with retrieved data
    const cityCountryName = `${data.name}, ${data.sys.country}`;
    document.querySelector(".city-name1").textContent = cityCountryName;
    document.querySelector(".temp").textContent = Math.round(data.main.temp) + "°C";
    document.querySelector(".pressure-value-sabin").textContent = data.main.pressure + "hPa";
    document.querySelector(".sabin-humidity-value").textContent = data.main.humidity + "%";
    document.querySelector(".wind-1").textContent = data.wind.speed + " km/h";
    // Get the weather condition
    const weatherDescription = data.weather[0].description;
    const cityConditionElement = document.querySelector(".city-condition1");
    cityConditionElement.textContent = weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1);
    // Update weather icon
    const weatherIconUrl = getWeatherIconUrl(data.weather[0].icon);
    weatherIcon.src = weatherIconUrl;
    // Set the current date
    const currentDate = new Date();
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    const formattedDate = currentDate.toLocaleDateString("en-US", options);
    document.querySelector(".sabin_date-value").textContent = formattedDate;
  } catch (error) {
    console.log("Error fetching weather data:", error);
  }
}
// Function to reset weather details in the UI
function resetWeatherDetails() {
  document.querySelector(".city-name1").textContent = "";
  document.querySelector(".city-condition1").textContent = "";
  document.querySelector(".sabin_date-value").textContent = "";
  document.querySelector(".temp").textContent = "";
  document.querySelector(".pressure-value-sabin").textContent = "";
  document.querySelector(".sabin-humidity-value").textContent = "";
  document.querySelector(".wind-1").textContent = "";
  weatherIcon.src = ""; // Clear weather icon
}
// Function to get the weather icon URL
function getWeatherIconUrl(iconCode) {
  return `https://openweathermap.org/img/wn/${iconCode}.png`;
}
// Show weather information for the default city (Vale of Glamorgan) on page load
window.addEventListener("DOMContentLoaded", () => {
  checkWeather("Vale of Glamorgan");
});
