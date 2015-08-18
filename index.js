var express = require('express');
var swig = require('swig');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.set('view cache', false);
swig.setDefaults({ cache: false });

app.use(express.static('public'));


var choose = function(array) {
    var index = Math.floor(Math.random() * array.length);
    return array[index];
};

var bandNames = {
    country: {
        prefixes: ['The Ol\' Time', 'The Foggy Mountain', 'The Whiskey Drinkin\''],
        suffixes: ['Hillbillies', 'Boys', 'Bluegrass Band'],
    },
    metal: {
        prefixes: ['Death of', 'Reign in', 'Black'],
        suffixes: ['Blood', 'Skulls', 'Chains']
    },
    jazz: {
        prefixes: ['Bebop', 'The Duke Earl Jones', 'Jellyroll'],
        suffixes: ['Experience', 'Swing Band', 'Jive Bunnies']
    }
};

var generateBandName = function(genre) {
    return choose(bandNames[genre].prefixes) + ' ' +
           choose(bandNames[genre].suffixes);
};

app.get('/', function(req, res) {
    res.render('form');
});

app.post('/', function(req, res) {
    var genre = req.body.genre;
    var bandName = generateBandName(genre);

    res.render('output', {name: bandName});
});

app.listen(8080);
