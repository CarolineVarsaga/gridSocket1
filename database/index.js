const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const { mongoose } = require('mongoose');
const dotenv = require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');
const chatRoomRoutes = require('./routes/chatRoomRoutes');

const app = express();
const PORT = 3030;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

const allowedOrigin = 'http://127.0.0.1:5500';

const corsOptions = {
  credentials: true,
  allowedOrigin: allowedOrigin,
};

app.use(cors(corsOptions));

app.use('/users', userRoutes);
app.use('/messages', messageRoutes);
app.use('/rooms', chatRoomRoutes);

app.listen(3030, () => {
  console.log(`Server is running on port 3030`);
  mongoose.connect(
    `mongodb+srv://jarileminaho:${process.env.DB_PW}@cluster0.rf4p1sc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  );
});
