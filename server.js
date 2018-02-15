const express = require('express');
const app = express();
const db = require('./db');
app.use(require('body-parser').urlencoded());
app.use(require('method-override')('_method'));

const nunjucks = require('nunjucks');
nunjucks.configure({ noCache: true });
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use('/', require('./routes'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));

db.syncAndSeed();
