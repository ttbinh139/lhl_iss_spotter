const { nextISSTimesForMyLocation } = require('./iss_promised');

nextISSTimesForMyLocation()
  .then((data) => {
    //console.log(data);
    let passTimes = data.response;
    for (let i = 0; i < passTimes.length; i++) {
      const dateTime = new Date();
      dateTime.setUTCSeconds(passTimes[i].risetime);
      let output = `Next pass at ${dateTime} for ${passTimes[i].duration} seconds!`;
      console.log(output);
    }
  })
  .catch((error) => {
    console.log(error);
  });