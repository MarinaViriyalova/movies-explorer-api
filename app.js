require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const { limiter } = require('./middlewares/limiter');
const routes = require('./routes/index');
const { errorHandler } = require('./middlewares/error');
const { PORT, DB_ADDRESS } = require('./config');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(DB_ADDRESS, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const whiteList = {
    origin: 'http://localhost:3000',
};

app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use(cors());
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});