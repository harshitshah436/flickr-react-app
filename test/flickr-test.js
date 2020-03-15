const app = require('../index.js').app;
const request = require('supertest');
const expect = require('chai').expect;

describe("Flickr API", function () {

  it("returns photos with 200 status code. GET /api/flickr?page=x", function (done) {
    request(app)
      .get('/api/flickr?page=1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect( (res) => {
        expect(res.body).to.have.property('photos');
      })
      .expect(200, done);
  });

  it("returns photos by a keyword with 200 status code. GET /api/flickr/search/:page/:text", function (done) {
    request(app)
      .get('/api/flickr/search/1/nasa')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect( (res) => {
        expect(res.body).to.have.property('photos');
      })
      .expect(200, done);
  });

  it("returns the oldest photos by a keyword with 200 status code. GET /api/flickr/sort/asc/:page/:text", function (done) {
    request(app)
      .get('/api/flickr/sort/asc/1/nasa')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect( (res) => {
        expect(res.body).to.have.property('photos');
      })
      .expect(200, done);
  });

  it("returns the latest photos by a keyword with 200 status code. GET /api/flickr/sort/desc/:page/:text", function (done) {
    request(app)
      .get('/api/flickr/sort/desc/1/nfl')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect( (res) => {
        expect(res.body).to.have.property('photos');
      })
      .expect(200, done);
  });

  it("returns sizes array by a unique photo id. GET /api/flickr/photo/:property/:id", function (done) {
    request(app)
      .get('/api/flickr/photo/getSizes/49630233371')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect( (res) => {
        expect(res.body).to.have.property('sizes');
      })
      .expect(200, done);
  });
});