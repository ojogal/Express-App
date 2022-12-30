import express from 'express'
import path from 'path'
import {requestTime, logger} from './middleware'

const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT ?? 4001;

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}..`)
});

app.use(express.static(path.resolve(__dirname, 'static')));
app.use(requestTime);

// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'static', 'index.html'));
// })

app.get('/features', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'static', 'features.html'));
})

app.get('/download', (req, res) => {
  res.download(path.resolve(__dirname, 'static', 'index.html'));
})