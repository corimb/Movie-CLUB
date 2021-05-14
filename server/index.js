import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();
dotenv.config();
app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));
app.use(bodyParser.json({ limit: '1mb', extended: true }));
app.use(cors());

app.use('/posts', postRoutes); // all the paths in postRoutes start with the path '/posts'.
app.use('/user', userRoutes); // all the paths in userRoutes start with the path '/user'.

app.get('/', (req, res) => {
    res.send('Hello to memo API')
}) // deploy version

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
.then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
.catch((error) => console.log(error.message));

mongoose.set('useUnifiedTopology', false);