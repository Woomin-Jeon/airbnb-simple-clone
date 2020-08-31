const express = require('express');

const app = express();

const PORT = 3000;

app.set('view engine', 'pug');
app.set('views', './pugs');

app.use(express.json());

app.get('/', (req, res) => {
  res.render('index');
})

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}...`);
});
