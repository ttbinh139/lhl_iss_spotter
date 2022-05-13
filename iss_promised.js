const request = require('request-promise-native');

const fetchMyIP = function() {
  let url = "https://api.ipify.org/?format=json";
  return request(url);
};

const fetchCoordsByIP = function(ip) {
  //console.log(ip);
  let realIP = JSON.parse(ip).ip;
  let apiKey = "z5lsTobcP8f7Sl3EbrbEpObRr3GAiYUFnY6XDnLT";
  let url = `https://api.ipbase.com/v2/info?apikey=${apiKey}&ip=${realIP}`;
  return request(url);
};

const fetchISSFlyOverTimes = function(data) {
  const location = JSON.parse(data).data.location;
  const info = { lat: location.latitude, long: location.longitude };
  let url = `https://iss-pass.herokuapp.com/json/?lat=${info.lat}&lon=${info.long}`;
  //console.log(url);
  return request(url);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      return JSON.parse(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = { nextISSTimesForMyLocation };