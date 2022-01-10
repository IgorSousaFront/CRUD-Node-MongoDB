const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
const port = 5000;

app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(express.json());

// Rotas da API
const providerRoutes = require('./Routes/providerRoutes');

app.use('/provider', providerRoutes)

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD); 

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@firstcluster.bldbd.mongodb.net/apiTokStok?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log('Aplicação conectada ao MongoDB')
    app.listen(port)
  })
  .catch((err) => console.log(err))