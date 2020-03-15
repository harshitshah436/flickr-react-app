# flickr-react-app

This project fetches images from Flickr using NASA's user account.

## Overview

### Application functions

- The home page fetches the latest Flickr photos from NASA's public user account. It uses Flickr API services to get images and data.
- Infinite scroller is used to load photos, so when scrolled down, it will pull other images from the next page. Performance-wise this will load faster as we are not waiting to get all Flicker images data at first. Instead, photos from one page are loaded during one rest call.
- The searching/filtering option is proved by the search bar in the Header. It pulls images from the NASA user account with a provided keyword. Keywords search is performed across photos' title, description or tags. (Keywords tested: NASA, rocket, 2017, NFL)
- Sort (Latest|Earliest) option in combination with a search keyword can be used to get the latest/oldest photos from NASA's user account.
- The detailed view can be accessed by clicking on any photo from the grid. This brings up larger thumbnail, title, description, number of views, comments and tags.

### Technologies used

- NodeJS - backend/server app to create Flickr API using the express router
- ReactJS - frontend/client app to get Flickr photos and provide search & sort options

## Getting Started

### Installation

#### Prerequisites
- `node` & `npm`
    - With the installation of the node, npm is by default installed.
    - Verify using the commands: `node -v` & `npm -v`
    - Application tested on
        ```
        $ npm -v
            6.13.4
        $ node -v
            v12.16.1
        ```

#### Start application (Steps to Run)

In the project **root** directory, run:
```
cd client
npm ci
cd ..
npm ci
npm start
```

##### Explanation

- `npm ci` installs npm packages and create `node_modules` directory for both server and client apps. If `npm ci` gives any dependency error, use `npm install` command instead of it.
- `npm start` command works as below for this application:
    - Concurrently start NodeJS (server) and ReactJS (client) applications.
    - NodeJS server application first runs unit tests before starting the server on the port `3001`.
    - ReactJS client application runs on the port `3000`.
- Once all steps are completed successfully, our NASA Flickr application is launched at http://localhost:3000
- API Documentation (Swagger UI) is available at http://localhost:3001/api-docs

### Installation using Docker (Cloud-native)

#### Prerequisites

- `docker` & `docker-compose`
    - Verify using the commands: `docker -v` & `docker-compose -v`
        ```
        $ docker -v
            Docker version 19.03.1, build 74b1e89
        $ docker-compose -v
            docker-compose version 1.24.1, build 4667896b
        ```

#### Start application (Steps to Run)

In the project **root** directory, run:
```
docker-compose up
```

#### Stop application

```
docker-compose down
```

#### Restart containers with the new code

```
docker-compose up --build
```

## Unit tests

Using `mocha`, `chai` and `supertest` npm packages, created unit tests for the Flickr API route.

In the project directory, run: `npm test`

Output:
```
   Flickr API
    ✓ returns photos with 200 status code. GET /api/flickr?page=x (307ms)
    ✓ returns photos by a keyword with 200 status code. GET /api/flickr/search/:page/:text (478ms)
    ✓ returns the oldest photos by a keyword with 200 status code. GET /api/flickr/sort/asc/:page/:text (251ms)
    ✓ returns the latest photos by a keyword with 200 status code. GET /api/flickr/sort/desc/:page/:text (268ms)
    ✓ returns sizes array by a unique photo id. GET /api/flickr/photo/:property/:id (180ms)


   5 passing (1s)
```

## API Documentation (Swagger UI)
Once the application starts, Swagger UI will be available at http://localhost:3001/api-docs.

## Rest APIs used

- [flickr.people.getPublicPhotos](https://www.flickr.com/services/api/flickr.people.getPublicPhotos.html)
- [flickr.photos.search](https://www.flickr.com/services/api/flickr.photos.search.html)
- [flickr.photos.getInfo](https://www.flickr.com/services/api/flickr.photos.getInfo.html)
- [flickr.photos.getSizes](https://www.flickr.com/services/api/flickr.photos.getSizes.html)
- [flickr.photos.getFavorites](https://www.flickr.com/services/api/flickr.photos.getFavorites.html)

## Resources
* [Flickr API services](https://www.flickr.com/services/api/)
* [Create React App - Getting Started](https://create-react-app.dev/docs/getting-started)
* [Adding Swagger to NodeJS project](https://blog.cloudboost.io/adding-swagger-to-existing-node-js-project-92a6624b855b)