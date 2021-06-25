const express = require('express');
const mogoose = require('mongoose');
const articlesRouter = require('./routes/articles');
const Article = require('./models/articles');
const methodOverride = require('method-override');
const app = express();

mogoose.connect('mongodb://localhost/blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.get('/', async (req, res) => {
  const articles = await Article.find().sort({
    createAt: 'desc'
  });
  res.render('articles/index', { articles });
});

app.use('/articles', articlesRouter);

app.listen(4000);
