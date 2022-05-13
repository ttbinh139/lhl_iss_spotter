const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');

/* fetchMyIP((error, ip) => {
  if (error) {
    console.log(error);
  } else {
    console.log(ip);
  }
});

fetchCoordsByIP('205.250.47.120', function(error, data) {
  if (error) {
    console.log(error);
  } else {
    console.log(data);
  }
});

let coords = { lat: 49.20212173461914, long: -122.8425064086914 };
fetchISSFlyOverTimes(coords, function(error, data) {
  if (error) {
    console.log(error);
  } else {
    console.log(data);
  }
}); */


nextISSTimesForMyLocation((error, data) => {
  if (error) {
    console.log(error);
  } else {
    let passTimes = data.response;
    for (let i = 0; i < passTimes.length; i++) {
      const dateTime = new Date();
      dateTime.setUTCSeconds(passTimes[i].risetime);
      let output = `Next pass at ${dateTime} for ${passTimes[i].duration} seconds!`;
      console.log(output);
    }
  }
});

