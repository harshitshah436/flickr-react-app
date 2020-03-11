const express = require("express");
const request = require('request');

const app = express();

app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get("/api/flickr", (req, res) => {
  
  // To Do - Move this to router and store variables in env file
  API_KEY = "a5e95177da353f58113fd60296e1d250"
  USER_ID = "24662369@N07"
  var opt = {
      url: "https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key="+API_KEY+"&user_id="+USER_ID+"&format=json&nojsoncallback=1"
  };
  request(opt, function(err, response, body){
      if (err) { 
        throw err;
      }
      res.setHeader('Content-Type', 'application/json');
      res.send(body);
  });
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
