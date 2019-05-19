import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { History } from '../shared/models/history';
import { Users } from '../shared/models/users';
import { OverlayRef, Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ChatProfileComponent } from '../chat-profile/chat-profile.component';
import { ComponentPortal } from '@angular/cdk/portal';
import { ChatBarComponent } from '../chat-bar/chat-bar.component';
import { OverlayService } from '../overlay/overlay.service';
import { responsiveService } from '../shared/services/responsive.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public isMobile: boolean;

  constructor(private responsiveService: responsiveService) {}

  public pushMessage: boolean;

  //Initialisierung #1
  ngOnInit(){
    var timestamp = this.currentTimestamp();
    var date = this.currentDate();

    var chatHistoryInit = [['Code&Chat 2019', 'EasyChat App v4', 'Initialized chatHistory', timestamp, date, '[//]'], ['[nickname]', '[message]', '[color]', '[timestamp]', '[date]', '[UID]']];
    History.chatHistory = chatHistoryInit;

    var userHistoryInit = [['Code&Chat 2019 – EasyChat App v4', 'Initialized userHistory', timestamp, date], ['[nickname]', '[color]', '[img]', '[UID]']];
    Users.initUserHistory = userHistoryInit;

    this.onResize();
    this.responsiveService.checkWidth();

    //this.profileOverlay();
    console.log('Init chat');
  }

  receiveMessage($event){
    var uid = $event[0];
    var message = $event[1];
    var userHistory = Users.userHistory;

    var userData = userHistory.filter(u => u[3] == uid);
    
    var nickname = userData[0][0];
    var color = userData[0][1];
    var img = userData[0][2];
    var timestamp = this.currentTimestamp();
    var date = this.currentDate();

    var chatArray = [nickname, message, color, timestamp, date, uid];
    this.addtoHistory(chatArray);
    if(this.pushMessage){
      this.pushMessage = false;
    } else {
      this.pushMessage = true;
    }
    return;
  }

  receiveProfile($event){
    var nickname = $event[0];
    var color = $event[1];
    var img = $event[2];
    var uid = $event[3];

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
  }

  addtoHistory(chatArray){
    History.push = chatArray;
    return;
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
    var dayArray = new Array('Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag');
    var monthArray = new Array ('Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember');
    var dmyTimestamp = dayArray[day] + ', ' + date.getDate() + '. ' + monthArray[month] + ' ' + date.getFullYear();
    return dmyTimestamp;
  }

  onResize() {
    this.responsiveService.getMobileStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }
}