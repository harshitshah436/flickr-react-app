// Load environment variables from `.env` file (optional)
require('dotenv').config();

// Initialize an Express application
const express = require('express');
const app = express();

app.set("port", process.env.PORT || 3001);

// Generate Swagger API docs
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Enable All CORS Requests
const cors = require('cors')
app.use(cors())

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: false })); // to support URL-encoded bodies

/*==================START APP Code==================*/
var flickrRouter = require('./routes/flickr');

app.use('/api/flickr', flickrRouter);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
/*==================END==================*/
