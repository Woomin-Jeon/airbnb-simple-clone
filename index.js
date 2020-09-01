const express = require('express');
const DB = require('./DB');

const app = express();

const port = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.set('views', './pugs');

app.use(express.json());

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/signup', (req, res) => {
  res.render('signup');
});

app.post('/user-signup', async (req, res) => {
  await DB.addUser(req.body);
  res.status(200).send();
});

app.listen(port, () => {
  console.log(`server is running on port ${port}...`);
});
