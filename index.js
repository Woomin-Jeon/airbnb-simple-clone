const express = require('express');

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

app.post('/user-signup', (req, res) => {
  console.log(req.body);
});

app.listen(port, () => {
  console.log(`server is running on port ${port}...`);
});
