var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = 3000;

var chatHistory = [];
var userHistory = [];
var push = [];
var init = false;
var pushID = 0;

   //init

   //currentDate
 if(!init){
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
    chatHistory = chatHistoryInit;

    var userHistoryInit = [['Code&Chat 2019 – EasyChat App v4', 'Initialized userHistory', timestamp, date], ['[nickname]', '[color]', '[img]', '[UID]']];
    userHistory = userHistoryInit;
    init = true;
}

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

app.get('/', function (req, res, next) {
    res.json({ message: 'Easy-Chat api works...' });
});

//send history
app.get('/history', function (req, res, next) {
    console.log('[GET] chatHistory sent!');
    res.send(chatHistory);
});

app.get('/profiles', function (req, res, next){
    console.log('[GET] profiles sent!');
    res.send(userHistory);
});

app.get('/push', function (req, res, next){
    //console.log('[GET] push sent!')
    res.send(push);
});

//receiveMessage
app.post('/history', function (req, res, next) {
    console.log('[POST] received msg!');
    var msgArray = req.body;
    var uid = msgArray.msg[0];
    var message = msgArray.msg[1];

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
    push = [chatArray, pushID];
    pushID = pushID + 1;
    res.json({ message: 'Message added to history!' });
    _push = chatArray;
        if(_push[0] === Array){
            var l = this._push.length;
            for(var i = 0; i < l; i++){
                chatHistory.push(_push[i]);
            }
        } else {
            chatHistory.push(_push);
        }
    return;
});

// receiveProfile
app.post('/profiles', function (req, res, next) {
    console.log('[POST] received profile!');
    var nickname = req.body.nickname;
    var color = req.body.color;
    var img = req.body.img;
    var uid = req.body.uid;

    var userArray = [nickname, color, img, uid];
    
    var userExists = false;
    for(var i = 0; i < userHistory.length; i++){
      var index = userHistory[i][3].indexOf(uid);
      if(index > -1){
        index = i;
        i = userHistory.length;
        userExists = true;
      }
    }
    if(userExists){
      userHistory[index][0] = nickname;
      userHistory[index][1] = color;
      userHistory[index][2] = img;
    return;
    } else {
      userHistory.push(userArray);
      return;
    }
});


app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});