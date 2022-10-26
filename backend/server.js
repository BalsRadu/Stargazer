const express = require('express');
const cors = require('cors')
const app = express();

const config = require('./config');
const db = require('./config/database');

const userRouter = require("./routes/user");
const postRouter = require("./routes/post");
const globalRouter = require("./routes/global")

app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use('*', cors());


app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/global', globalRouter);

app.listen(config.port, console.log('Server started on port %s', config.port));
