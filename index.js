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

var bandMembers = {
    country: {
        prefixes: ['Drinkin\' Willie', 'Bobby Shane', 'Leanne'],
        suffixes: ['McGraw III', 'Musgraves', 'Jackson Jr.'],
    },
    metal: {
        prefixes: ['Gorgoth', 'Gorehl', 'Burahl'],
        suffixes: ['The Destroyer', 'Bloodlust', 'Eluvith']
    },
    jazz: {
        prefixes: ['Duke Earl', 'Jellyroll', 'Cannonball'],
        suffixes: ['Jones', 'Ellington', 'Monk']
    }
};

var generateBandName = function(genre) {
    return choose(bandNames[genre].prefixes) + ' ' +
           choose(bandNames[genre].suffixes);
};

var generateBandMember = function(genre, instrument) {
    return {
        name: choose(bandMembers[genre].prefixes) + ' ' +
              choose(bandMembers[genre].suffixes),
        instrument: instrument
    };
};


app.get('/', function(req, res) {
    res.render('form');
});

app.post('/', function(req, res) {
    var genre = req.body.genre;
    var bandName = generateBandName(genre);

    var members = [];

    for (var i=0; i<5; i++) {
        var instrument = req.body['instrument' + i];
        if (instrument == 'none') {
            continue;
        }

        var member = generateBandMember(genre, instrument);
        members.push(member);
    }

    res.render('output', {name: bandName, members: members});
});

app.listen(8080);
