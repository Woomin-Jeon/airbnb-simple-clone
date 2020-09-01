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

app.post('/user/signup', async (req, res) => {
  const user = req.body;
  await DB.addUser(user);

  res.status(200).send();
});

app.post('/user/signup/id-validation', async (req, res) => {
  const { id } = req.body;
  const user = await DB.findUserById(id);

  if (user) {
    res.status(400).send(false);
    return;
  }

  res.status(200).send(true);
});


app.listen(port, () => {
  console.log(`server is running on port ${port}...`);
});
