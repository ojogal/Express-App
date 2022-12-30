import express from 'express'
import path from 'path'
import {requestTime, logger} from './middleware.js'

const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT ?? 4001;

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}..`)
});

// app.use(express.static(path.resolve(__dirname, 'static')));
app.use(requestTime);
app.use(logger);
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'ejs'));

app.get('/', (req, res) => {
  res.render('index', {title: 'Persha storinka', active: 'main'});
});

app.get('/features', (req, res) => {
  res.render('features', {title: 'Druga storinka', active: 'features'});
});

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