require('./models/db');

const express = require('express');
const Handlebars = require('handlebars')
const path = require('path');
const exphbs = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

const articleController = require('./controllers/articleController');

const app = express();
app.use(express.static('public'))
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.set('views', path.join(__dirname, '/views/'));
app.engine('handlebars', exphbs({ extname: 'handlebars', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/',handlebars: allowInsecurePrototypeAccess(Handlebars) }));
app.set('view engine', 'handlebars');



app.listen(3000, () => {
    console.log('Express server started at port : 3000');
});

app.use('/article', articleController);