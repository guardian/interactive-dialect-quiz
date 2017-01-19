var fs = require("fs");
var rp = require("request-promise");

var wordbankData = JSON.parse(fs.readFileSync("./wordbank.json"));

var withLocations = [];

wordbankData.forEach((word, i) => {
    setTimeout(() => {
        rp("http://nominatim.openstreetmap.org/search?q=" + word.where + "&format=json&polygon=0&addressdetails=1").then((data) => {
            var results = JSON.parse(data);

            if (results && results[0] && results[0].address && results[0].address["state_district"]) {
                word.geo = results[0].address["state_district"];
            } else if(results && results[0] && results[0].address && results[0].address["state"] && (results[0].address.state === "Scotland" || results[0].address.state === "Wales")) {
                word.geo = results[0].address.state;
            } else if(results && results[1] && results[1].address && results[1].address["state_district"]) {
                word.geo = results[1].address["state_district"];
            } else if(results && results[2] && results[2].address && results[2].address["state_district"]) {
                word.geo = results[2].address["state_district"];
            } else {
                
            }

            withLocations.push(word);
            console.log(i, word.where, word.geo);
            fs.writeFileSync("with-locations.json", "data:text/csv;charset=utf-8,%EF%BB%BF" + JSON.stringify(withLocations));
        });
    }, 25 * i);
});
