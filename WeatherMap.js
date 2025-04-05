/**
 * Homework 2: Part 3 Weather Map
 * Create a weather forceast map similar to BING
 */
document.addEventListener("DOMContentLoaded", function() {
    d3.select("#getWeather").on("click", function() {
        let zip = d3.select("#zipcode").property("value").trim();

        if (!zip) {
            alert("Please enter a ZIP code!");
            return;
        }

        let mapQuestUrl = `https://www.mapquestapi.com/geocoding/v1/address?key=3WPUmx3jKx3WDn2oyWJacN1GNb84WD6I&location=${zip}`;

        d3.json(mapQuestUrl).then(zipData => {
            let location = zipData.results[0].locations[0];
            let lat = location.latLng.lat;
            let lon = location.latLng.lng;
            let weatherZoneUrl = `https://api.weather.gov/points/${lat},${lon}`;

            return d3.json(weatherZoneUrl);
        }).then(zoneData => {
            let forecastUrl = zoneData.properties.forecast;
            return d3.json(forecastUrl);
        }).then(weatherForecast => {
            let periods = weatherForecast.properties.periods;
            let results = d3.select("#weatherResults").html(""); // Clear previous results

            periods.forEach(period => {
                let div = results.append("div").attr("class", "weather-item");
                div.append("h3").text(period.name);
                div.append("p").text(period.detailedForecast);
                div.append("img").attr("src", period.icon).attr("alt", "Weather icon");
            });
        }).catch(error => {
            console.error("Error fetching weather data:", error);
            alert("Failed to fetch weather data. Check your ZIP code.");
        });
    });
});
