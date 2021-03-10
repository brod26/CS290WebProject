/*
Bryan Rodriguez
2/14/21
A5: Ajax Interactions

sources: MDN documentation, AJAX function skeleton taken from Week 6 Module, Eloquent Javascript, 
and arrow functions taken from JS and JQuery by Jon Duckett
*/

const appid = '01c1c8136d144790e3ed8e883ec940d2' //api key

window.addEventListener("DOMContentLoaded", () => {
    getWeather();
    returnPOST();
});

// makes an API call to Open Weather with the city and country code or zip code and country code parameters passed as JSON arguments
// returned data is parsed and displayed within a span on index.html
function getWeather() {
    document.getElementById("weatherReport").addEventListener("click", function (event) {
        var request = new XMLHttpRequest();
        // builds parameters being sent to the API
        var city = document.getElementById("city").value;
        var zipCode = document.getElementById("zip").value;
        var countryCode = document.getElementById("country").value;
        var payload;
        // adjusts the URL parameters sent to the API if the user inputs a City, else it uses the zipCode variabel in the URL parameters
        if (city) {
            payload = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "," + countryCode + "&appid=" + appid + "&units=imperial";
            console.log(payload)
        } else {
            payload = "https://api.openweathermap.org/data/2.5/weather?zip=" + zipCode + "," + countryCode + "&appid=" + appid + "&units=imperial";
            console.log(payload)
        }

        request.open("GET", payload, true);
        request.addEventListener("load", function () {
            if (request.status >= 200 && request.status < 400) {
                var response = JSON.parse(request.responseText);
                document.getElementById("weatherDisplay").textContent = "It is " + response.main.temp + " degrees in " + response.name;
            } else {
                console.log("error: " + request.statusText);
            }
        });
        request.send();
        event.preventDefault();
    })
};

// makes an API POST submission to httpin.org/post with input passed by the user. retured data is parsed and siplayed within a span on index.html
function returnPOST() {
    document.getElementById("POSTtext").addEventListener("click", function (event) {
        var request = new XMLHttpRequest();
        var payload = {
            "textToSend": null
        };
        payload.textToSend = document.getElementById("postRequest").value;
        request.open("POST", "https://httpbin.org/post", true);
        request.setRequestHeader("Content-Type", "application/json");
        request.addEventListener("load", function () {
            if (request.status >= 200 && request.status < 400) {
                var response = JSON.parse(request.responseText);
                document.getElementById("postReturn").textContent = response.json.textToSend;
                console.log(response.data);
            } else {
                console.log("error: " + request.statusText);
            }
        });
        request.send(JSON.stringify(payload));
        event.preventDefault();
    })
};
