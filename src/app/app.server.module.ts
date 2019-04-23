import { NgModule, OnInit } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ModuleMapLoaderModule,
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule implements OnInit{

  public pushMessage;
  public chatHistory;

  constructor() {
  }

  //initialisierung #1
  ngOnInit(){
    var timestamp = this.currentTimestamp();
    var date = this.currentDate();

    this.chatHistory = [['Code&Chat 2019', 'EasyChat App v4', 'Initialized chatHistory', timestamp, date],['[nickname]', '[message]', '[color]', '[timestamp]', '[date]']];
    this.pushMessage = this.chatHistory;
    console.log('SERVER TEST123');
  }

  receiveMessage($event){
    var nickName = $event[0];
    var message = $event[1];
    var color = $event[2];
    var timestamp = this.currentTimestamp();
    var date = this.currentDate();

    var chatArray = [nickName, message, color, timestamp, date];
    this.addtoHistory(chatArray);
    this.pushMessagetoLocal(chatArray);
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
