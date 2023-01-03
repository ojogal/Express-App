import express from 'express';
import mongoose from 'mongoose';
// import bodyParser from 'body-parser';
import userRoutes from './routes/users.js';
import authRouter from './routes/authRouter.js';
import postRouter from './routes/posts.js';
import fileUpload from 'express-fileupload';
// import path from 'path'
// import {requestTime, logger} from './middleware.js'
// import serverRoutes from './routes/servers.js'

// const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT ?? 4001;
const DB_URL = 'mongodb+srv://ojogal:nD4piUNPLfZRftM@cluster0.pzjgw9z.mongodb.net/?retryWrites=true&w=majority';

app.use(express.json());
app.use('/users', userRoutes);
app.use('/auth', authRouter);
app.use('/api', postRouter);
app.use(fileUpload({}));

const start = async () => {
  try {
      await mongoose.connect(DB_URL);
      app.listen(PORT, () => {
        console.log(`Server started on PORT http://localhost:${PORT}..`)
      });
  } catch (e) {
      console.log();
  }
};

start();

// app.use(express.static(path.resolve(__dirname, 'static')));
// app.use(requestTime);
// app.use(logger);
// app.set('view engine', 'ejs');
// app.set('views', path.resolve(__dirname, 'ejs'));
// app.use(serverRoutes);

// app.get('/', (req, res) => {
//   res.render('index', {title: 'Persha storinka', active: 'main'});
// });

// app.get('/features', (req, res) => {
//   res.render('features', {title: 'Druga storinka', active: 'features'});
// });

// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'static', 'index.html'));
// })

// app.get('/features', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'static', 'features.html'));
// })

// app.get('/download', (req, res) => {
//   console.log(req,requestTime)
//   res.download(path.resolve(__dirname, 'static', 'index.html'));
// })