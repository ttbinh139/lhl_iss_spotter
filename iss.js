const request = require('request');
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function (callback) {
  let url = "https://api.ipify.org/?format=json";
  request(url, function (error, response, body) {
    if (error) {
      callback(error, null);
      return;
    }
    if (response && response.statusCode !== 200) {
      //callback(error, null);
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    let data = JSON.parse(body);
    callback(null, data.ip);
  });

}

const fetchCoordsByIP = function(ip, callback) {
  let apiKey = "z5lsTobcP8f7Sl3EbrbEpObRr3GAiYUFnY6XDnLT";
  let url = `https://api.ipbase.com/v2/info?apikey=${apiKey}&ip=${ip}`;
  request(url, function (error, response, body) {
    if (error) {
      callback(error, null);
      return;
    }
    if (response && response.statusCode !== 200) {
      //callback(error, null);
      const msg = `Status Code ${response.statusCode} when fetching Geolocation. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const location = JSON.parse(body).data.location;
    const info = { lat: location.latitude, long: location.longitude };
    callback(null, info);
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  let url = `https://iss-pass.herokuapp.com/json/?lat=${coords.lat}&lon=${coords.long}`;
  request(url, function (error, response, body) {
    if (error) {
      callback(error, null);
      return;
    }
    if (response && response.statusCode !== 200) {
      //callback(error, null);
      console.log(coords);
      const msg = `Status Code ${response.statusCode} when fetching data. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body);
    callback(null, data);
  });
}
//fetchMyIP();
//fetchCoordsByIP();

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      //console.log(error);
      callback(error, null);
      return;
    } else {
      fetchCoordsByIP(ip, (error, coords) => {
        if (error) {
          //console.log(error);
          callback(error, null);
          return;
        } else {
          fetchISSFlyOverTimes(coords, (error, data) => {
            if (error) {
              //console.log(error);
              callback(error, null);
              return;
            } else {
              //console.log(data);
              callback(null, data)
            }
          });
        }
      });
    }
  });
};
module.exports = { /* fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes,  */nextISSTimesForMyLocation };