const express = require('express');
const util = require('../helper/util');

const router = express.Router();
const api_key = process.env.API_KEY;
const user_id = process.env.USER_ID;
const flickrApi = "https://api.flickr.com/services/rest/"

// GET /api/flickr?page=x - get flickr photos on the home page
router.get("/", async (req, res) => {
  let page = req.query.page;
  console.log( `GET /api/flickr?page=${page}`);
  let url = `${flickrApi}?method=flickr.people.getPublicPhotos&api_key=${api_key}&user_id=${user_id}&extras=url_z%2C+views%2C+owner_name&per_page=20&page=${page}&format=json&nojsoncallback=1`;
  let response = await util.handleRequest(url, "GET");
  res.send(response);
});

// GET /api/flickr/search/:page/:text - get flickr photos by keyword search
router.get("/search/:page/:text", async (req, res) => {
  let page = req.params.page;
  let text = req.params.text;
  console.log(`GET /api/flickr/search/${page}/${text}`);
  let url = `${flickrApi}?method=flickr.photos.search&api_key=${api_key}&user_id=${user_id}&text=${text}&date=&extras=url_z%2C+views%2C+owner_name&per_page=20&page=${page}&format=json&nojsoncallback=1`;
  let response = await util.handleRequest(url, "GET");
  res.send(response);
});

// GET /api/flickr/sort/asc/:page/:text - get earliest flickr photos by keyword search or home page list
router.get("/sort/asc/:page/:text", async (req, res) => {
  let page = req.params.page;
  let text = req.params.text;
  let sortType = "date-posted-asc"
  console.log(`GET /api/flickr/sort/asc/${page}/${text}`);
  let url = ""
  if (text != 'undefined') {
    url = `${flickrApi}?method=flickr.photos.search&api_key=${api_key}&user_id=${user_id}&text=${text}&sort=${sortType}&extras=url_z%2C+views%2C+owner_name&per_page=20&page=${page}&format=json&nojsoncallback=1`;
  } else {
    url = `${flickrApi}?method=flickr.photos.search&api_key=${api_key}&user_id=${user_id}&sort=${sortType}&extras=url_z%2C+views%2C+owner_name&per_page=20&page=${page}&format=json&nojsoncallback=1`
  }
  let response = await util.handleRequest(url, "GET");
  res.send(response);
});

// GET /api/flickr/sort/asc/:page/:text - get latest flickr photos by keyword search or home page list
router.get("/sort/desc/:page/:text", async (req, res) => {
  let page = req.params.page;
  let text = req.params.text;
  let sortType = "date-posted-desc"
  console.log(`GET /api/flickr/sort/desc/${page}/${text}`);
  let url = ""
  if (text != 'undefined') {
    url = `${flickrApi}?method=flickr.photos.search&api_key=${api_key}&user_id=${user_id}&text=${text}&sort=${sortType}&extras=url_z%2C+views%2C+owner_name&per_page=20&page=${page}&format=json&nojsoncallback=1`;
  } else {
    url = `${flickrApi}?method=flickr.photos.search&api_key=${api_key}&user_id=${user_id}&sort=${sortType}&extras=url_z%2C+views%2C+owner_name&per_page=20&page=${page}&format=json&nojsoncallback=1`
  }
  let response = await util.handleRequest(url, "GET");
  res.send(response);
});

// GET /api/flickr/photo/:property/:id - get a property of the photo by photo id.
router.get("/photo/:property/:id", async (req, res) => {
  let property = req.params.property;
  let id = req.params.id;
  console.log(`GET /api/flickr/photo/${property}/${id}`);
  let url = `${flickrApi}?method=flickr.photos.${property}&api_key=${api_key}&photo_id=${id}&format=json&nojsoncallback=1`
  let response = await util.handleRequest(url, "GET");
  res.send(response);
});

module.exports = router;