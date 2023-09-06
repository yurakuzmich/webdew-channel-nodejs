const express = require('express');
const chalk = require('chalk');
const errorMsg = chalk.bgKeyword('white').redBright;
const successMsg = chalk.bgKeyword('green').white;
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
app.set('view engine', 'ejs');
const methodOverride = require('method-override');
const postRoutes = require('./routes/post-routes');
const postApiRoutes = require('./routes/api-post-routes');
const contactRoutes = require('./routes/contact-routes');
const createPath = require('./helpers/create-path');
const morgan = require('morgan');

mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(successMsg('MongoDB connected')))
  .catch(error => console.log(errorMsg(error)));

app.listen(process.env.PORT, (error) => {    
  error ? console.log(errorMsg(error)) : console.log(successMsg(`Server is listening on port ${process.env.PORT}`));
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static('styles'));
app.use(methodOverride('_method'));
app.get('/', (req, res) => {
    const title = 'Home';
    res.render(createPath('index'), { title });
});

app.use(postRoutes);
app.use(postApiRoutes);
app.use(contactRoutes);

app.use((req, res) => {
    const title = 'Error';
    res.status(404).render(createPath('error'), { title });
});
