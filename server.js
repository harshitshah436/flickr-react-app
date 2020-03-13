const express = require("express");
const request = require('request');

const app = express();

app.set("port", process.env.PORT || 3001);

//Handles all node middlewares
app.use(require('./util/midwares'));

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// To Do - Move this to router and store variables in env file
API_KEY = "a5e95177da353f58113fd60296e1d250"
USER_ID = "24662369@N07"

app.get("/api/flickr/:page", (req, res) => {
  page = req.params.page;
  var opt = {
    url: `https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=${API_KEY}&user_id=${USER_ID}&extras=url_z%2C+views%2C+owner_name&per_page=20&page=${page}&format=json&nojsoncallback=1`
    // url: "https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key="+API_KEY+"&user_id="+USER_ID+"&format=json&nojsoncallback=1"
  };
  request(opt, function (err, response, body) {
    if (err) {
      throw err;
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(body);
  });
});

app.get("/api/flickr/:page/:text", (req, res) => {
  page = req.params.page;
  text = req.params.text;
  var opt = {
    url: `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&user_id=${USER_ID}&text=${text}&date=&extras=url_z%2C+views%2C+owner_name&per_page=20&page=${page}&format=json&nojsoncallback=1`
  };
  request(opt, function (err, response, body) {
    if (err) {
      throw err;
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(body);
  });
});

app.get("/api/flickr/sort/asc/:page/:text", (req, res) => {
  let page = req.params.page;
  let text = req.params.text;
  let sortType = "date-posted-asc"
  
  let url = ""
  if (text != 'undefined') {
    url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&user_id=${USER_ID}&text=${text}&sort=${sortType}&extras=url_z%2C+views%2C+owner_name&per_page=20&page=${page}&format=json&nojsoncallback=1`;
  } else {
    url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&user_id=${USER_ID}&sort=${sortType}&extras=url_z%2C+views%2C+owner_name&per_page=20&page=${page}&format=json&nojsoncallback=1`
  }

  let opt = {
    url: url
  };

  request(opt, function (err, response, body) {
    if (err) {
      throw err;
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(body);
  });

});

app.get("/api/flickr/sort/desc/:page/:text", (req, res) => {
  let page = req.params.page;
  let text = req.params.text;
  let sortType = "date-posted-desc"

  let url = ""
  if (text != 'undefined') {
    url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&user_id=${USER_ID}&text=${text}&sort=${sortType}&extras=url_z%2C+views%2C+owner_name&per_page=20&page=${page}&format=json&nojsoncallback=1`;
  } else {
    url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&user_id=${USER_ID}&sort=${sortType}&extras=url_z%2C+views%2C+owner_name&per_page=20&page=${page}&format=json&nojsoncallback=1`
  }

  let opt = {
    url: url
  };

  request(opt, function (err, response, body) {
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
