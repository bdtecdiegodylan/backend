// require others
const express = require('express');
const cors = require('cors');
const app = express();
const Routes = require("./routes/index");

// middlewares 
app.use(express.json());
app.use(cors());

// routes 
app.use(Routes);
const dbHelper = require('./db/db.helper').getInstance();


app.listen(3000, () => {
    console.log('Web Server listening on port 3000');
});