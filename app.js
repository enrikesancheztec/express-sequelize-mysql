const express = require('express')
const morgan = require('morgan');
const cors = require('cors');
const apiRoutes = require("./routes/persona.routes");

// App
const app = express()
// Morgan
app.use(morgan('tiny'))

app.use(express.json());
app.use(cors());

const db = require("./models");

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// Add routes
app.use('/', apiRoutes);

// Starting server
const PORT = process.env.PORT || 8080
module.exports = app.listen(PORT);