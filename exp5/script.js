async function getWeather() {
  var city = document.getElementById("city").value.trim();
  var result = document.getElementById("result");
  if (city === "") { result.textContent = "Please enter a city name."; return; }
  result.textContent = "Loading...";
  try {
    var geo = await fetch("https://geocoding-api.open-meteo.com/v1/search?name=" + encodeURIComponent(city) + "&count=1");
    var geoData = await geo.json();
    if (!geoData.results) { result.textContent = "City not found."; return; }
    var p = geoData.results[0];
    var url = "https://api.open-meteo.com/v1/forecast?latitude=" + p.latitude +
      "&longitude=" + p.longitude + "&current=temperature_2m,relative_humidity_2m,wind_speed_10m";
    var data = await (await fetch(url)).json();
    var c = data.current;
    result.innerHTML = "<h3>" + p.name + ", " + (p.country || "") + "</h3>" +
      "Temperature: " + c.temperature_2m + " °C<br>" +
      "Humidity: " + c.relative_humidity_2m + " %<br>" +
      "Wind: " + c.wind_speed_10m + " km/h";
  } catch (e) {
    result.textContent = "Unable to get weather. Check your internet.";
  }
}
document.getElementById("city").addEventListener("keydown", function (e) { if (e.key === "Enter") getWeather(); });
