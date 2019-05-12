var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = 3000;

app.set('port', port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    // Pass to next layer of middleware
    next();
});

// init
app.get('/', function (req, res, next) {
    res.json({ message: 'Easy-Chat api works...' });
    var timestamp = this.currentTimestamp();

    //currentDate
    var date = new Date();
    var day = date.getDay();
    var month = date.getMonth();
    var dayArray = new Array('Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag');
    var monthArray = new Array ('Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember');
    var date = dayArray[day] + ', ' + date.getDate() + '. ' + monthArray[month] + ' ' + date.getFullYear();

    //currentTimestamp
    var currentdate = new Date();
    if(currentdate.getMinutes() < 10){
      var timestamp = currentdate.getHours() + ':0' + currentdate.getMinutes();
    }
    else {
      var timestamp = currentdate.getHours() + ':' + currentdate.getMinutes();
    }

    var chatHistoryInit = [['Code&Chat 2019', 'EasyChat App v4', 'Initialized chatHistory', timestamp, date, '[//]'], ['[nickname]', '[message]', '[color]', '[timestamp]', '[date]', '[UID]']];
    History.chatHistory = chatHistoryInit;

    var userHistoryInit = [['Code&Chat 2019 – EasyChat App v4', 'Initialized userHistory', timestamp, date], ['[nickname]', '[color]', '[img]', '[UID]']];
    Users.initUserHistory = userHistoryInit;
});

// history
app.get('/history', function (req, res, next) {
    res.send(History.chatHistory);
});

//receiveMessage
app.post('/history', function (req, res, next) {
    console.log(req.body);
    var msgArray = req.body.msgArray;
    var uid = msgArray[0];
    var message = msgArray[1];
    var userHistory = Users.userHistory;

    var userData = userHistory.filter(u => u[3] == uid);
    
    var nickname = userData[0][0];
    var color = userData[0][1];
    var img = userData[0][2];

    // current Date
    var date = new Date();
    var day = date.getDay();
    var month = date.getMonth();
    var dayArray = new Array('Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag');
    var monthArray = new Array ('Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember');
    var date = dayArray[day] + ', ' + date.getDate() + '. ' + monthArray[month] + ' ' + date.getFullYear();

    // current Timestamp
    var currentdate = new Date();
    if(currentdate.getMinutes() < 10){
      var timestamp = currentdate.getHours() + ':0' + currentdate.getMinutes();
    }
    else {
      var timestamp = currentdate.getHours() + ':' + currentdate.getMinutes();
    }

    var chatArray = [nickname, message, color, timestamp, date, uid];
    History.push = chatArray;
    res.json({ message: 'Message added to history!' });
    return;
});

// receiveProfile
app.post('/nicknames', function (req, res, next) {
    console.log(req.body);
    var profileArray = req.body.profileArray;
    var nickname = profileArray[0];
    var color = profileArray[1];
    var img = profileArray[2];
    var uid = profileArray[3];

    var userArray = [nickname, color, img, uid];
    
    var userExists = false;
    for(var i = 0; i < Users.userHistory.length; i++){
      var index = Users.userHistory[i][3].indexOf(uid);
      if(index > -1){
        index = i;
        i = Users.userHistory.length;
        userExists = true;
      }
    }
    if(userExists){
      Users.userHistory[index][0] = nickname;
      Users.userHistory[index][1] = color;
      Users.userHistory[index][2] = img;
    return;
    } else {
      Users.userHistory.push(userArray);
      return;
    }
});


app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});