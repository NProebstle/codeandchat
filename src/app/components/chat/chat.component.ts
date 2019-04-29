import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public pushMessage;
  public chatHistory;
  public userList;
  public UID = 1;

  public userArray;

  constructor() {
  }

  //initialisierung #1
  ngOnInit(){
    var timestamp = this.currentTimestamp();
    var date = this.currentDate();

    this.chatHistory = [['Code&Chat 2019', 'EasyChat App v4', 'Initialized chatHistory', timestamp, date],['[nickname]', '[message]', '[color]', '[timestamp]', '[date]']];
    this.pushMessage = this.chatHistory;
    this.userList = [['Code&Chat 2019 – EasyChat App v4', 'Initialized userList', timestamp, date], ['[nickname]', '[color]']];
  }

  receiveMessage($event){
    var nickName = this.userArray[0];
    var message = $event[0];
    var color = this.userArray[1];
    var timestamp = this.currentTimestamp();
    var date = this.currentDate();

    var chatArray = [nickName, message, color, timestamp, date];
    this.addtoHistory(chatArray);
    this.pushMessagetoLocal(chatArray);
  }

  receiveProfile($event){
    var nickName = $event[0];
    var message = $event[2];
    // var curUID = this.UID;
    // this.UID = this.UID + 1

    this.userArray = [nickName, message];
  }

  addtoHistory(chatArray){
    this.chatHistory.push(chatArray);
    return;
  }

  pushMessagetoLocal(chatArray){
    this.pushMessage = chatArray;
  }

  currentTimestamp(){
    var currentdate = new Date();
    if(currentdate.getMinutes() < 10){
      var timestamp = currentdate.getHours() + ':0' + currentdate.getMinutes();
    }
    else {
      var timestamp = currentdate.getHours() + ':' + currentdate.getMinutes();
    }
    return timestamp;
  }

  currentDate(){
    var date = new Date();
    var day = date.getDay();
    var month = date.getMonth();
    var dayArray = new Array('Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag');
    var monthArray = new Array ('Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember');
    var dmyTimestamp = dayArray[day] + ', ' + date.getDate() + '. ' + monthArray[month] + ' ' + date.getFullYear();
    return dmyTimestamp;
  }

}