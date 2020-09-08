const express = require('express');

const app = express();

const session = require('./middlewares/session');

const port = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(session);

app.use('/', require('./routes'));

app.listen(port, () => {
  console.log(`server is running on port ${port}...`);
});
