import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  public alertText;
  public colorsCollapsed = true;
  public color = '#00802F';
  public dateBoxStyle = 'width:max-content;text-align:center;background:rgba(0, 128, 47, 0.8);border-radius:5px;font-size:18px;padding-top:5px;padding-bottom:5px;padding-left:10px;padding-right:10px;color:white;margin: 0 auto;';
  public textcolor = '#00802F';
  public initialOutput = 'Noch keine Chats vorhanden 😕';
  public message = '';
  public lastDate: string;
  public lastTimestamp;
  public longMessage = false;
  public messageCounter = 0;
  public messageArray;
  public mergedMessages = 0;
  public nickName = '';
  public output = '';
  public prevMessageID = '';

  constructor() {
  }
    send(){
      if(this.nickCheck() && this.messageCheck()){
        if(this.messageCounter == 0){
        this.styleFirstChat();
        }
        if(!this.longMessage){
          this.output = this.message;
          this.message = '';
          this.createMessage();
          return this.prevMessageID;
        }
        else {
          var numofMessages = this.messageArray.length;
          var i;
          for(i = 0; i < numofMessages; i++){
            this.output = this.messageArray[i];
            this.createMessage();
          }
          this.message = '';
          this.messageArray = null;
          this.longMessage = false;
        }
      }
    }      
    
    createMessage(){
      var c = this.messageCounter;
      this.messageCounter = c+1;
      var checkID = this.nickName + c;
      if(this.lastDate != this.currentDate()){
        this.createDateBox();
        this.createMessageElement();
      }else {
        if(c == 0){
          this.createMessageElement();
        }
        else if(this.prevMessageID == checkID){
         this.mergeMessages();
        }
        else {
         this.createMessageElement();
        }
      }
    }

    createMessageElement(){
      if(this.color == 'white'){
        this.textcolor = 'black';
      } else {
        this.textcolor = this.color;
      }
      this.lastTimestamp = this.currentTimestamp();
      var div = document.createElement('div');
      div.id = this.nickName + this.messageCounter;

      var header = document.createElement('h4');
      header.innerText = `${this.nickName}:`;
      div.appendChild(header);

      var chat = document.createElement('p');
      chat.innerText = `${this.output}`;
      div.appendChild(chat);

      var timestamp = document.createElement('span');
      var spanID = this.nickName + this.messageCounter + 'span';
      timestamp.id = spanID;
      timestamp.style.cssText = "position:absolute;bottom: 10px;right:10px;padding-bottom: 5px;font-size: 14px;float: right;";
      timestamp.innerText = `${this.lastTimestamp}`;
      div.appendChild(timestamp);

      div.style.cssText = `align-self: right;background-color: white;border: 1px solid ${this.color};border-radius: 5px;color: ${this.textcolor};clear: both;float: right;font-family: system-ui;font-size: 18px;line-height: 5px;margin: 10px 0;max-width: 80%;min-width: 300px;padding: 10px;padding-bottom: 5px;padding-top: 0px;position: relative;text-align: left;`;
      div.className = 'message-right';
      document.getElementById('output').appendChild(div);
      this.prevMessageID = div.id;
      this.mergedMessages = 0;
      this.updateScroll();
    }

    adaptTimestamp(){
      if(this.currentTimestamp() != this.lastTimestamp){
        var c = this.messageCounter - this.mergedMessages;
        var spanID = this.nickName + c + 'span';
        var span = document.getElementById(spanID);
        var newTimestamp = this.currentTimestamp();
        this.lastTimestamp = this.currentTimestamp();
        span.innerHTML = newTimestamp;
      }
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

    mergeMessages(){
      this.mergedMessages = this.mergedMessages + 1;
      this.adaptTimestamp();
      var div = document.getElementById(this.prevMessageID);
      var newChat = document.createElement('p');
      newChat.innerText = `${this.output}`;
      div.appendChild(newChat);
      div.id = this.nickName + this.messageCounter;
      this.prevMessageID = div.id;
      this.updateScroll();
    }

    messageCheck(){
      if(!/^\s*$/.test(this.message)){
        document.getElementById('chatInput').className = 'input';
        if(this.message.length > 65){
          this.messageArray = this.message.replace(/.{55}\S*\s+/g, "$&@").split(/\s+@/);
          this.longMessage = true;
        }
        return true;
      } 
      else {
        document.getElementById('alert').style.visibility = 'visible';
        this.alertText += " Bitte geben Sie eine Nachricht ein!";
        document.getElementById('chatInput').className = 'alert';
        return false;
      }
    }

    nickCheck(){
      if(!/^\s*$/.test(this.nickName)){
        if(this.nickName.length < 16){
          document.getElementById('alert').style.visibility = 'hidden';
          this.alertText = "";
          document.getElementById('nickInput').className = 'nick';
          return true;
        }  
        else {
          document.getElementById('alert').style.visibility = 'visible';
          this.alertText = "Der Nickname darf nicht länger als 15 Zeichen sein!";
          this.messageCheck();
          document.getElementById('nickInput').className = 'nickalert';
          return false;
        }
      }
      else {
        document.getElementById('alert').style.visibility = 'visible';
        this.alertText = "Nickname darf nicht leer sein!";
        this.messageCheck();
        document.getElementById('nickInput').className = 'nickalert';
        return false;
      }
    }

    changeColorDropdown(){
      if(this.colorsCollapsed){
        document.getElementById('cpGreen').className = 'cpList';
        document.getElementById('cpBlue').className = 'cpList';
        document.getElementById('cpRed').className = 'cpList';
        document.getElementById('cpWhite').className = 'cpList';
        document.getElementById('cpBlack').className = 'cpList';
        document.getElementById('chatInput').style.width = '478px';
        document.getElementById('chatInput').style.marginLeft = '0px';
        document.getElementById('cpRed').style.background = 'red';
        document.getElementById('cpRed').style.border = 'red';
        document.getElementById('cpBlue').style.background = 'blue';
        document.getElementById('cpBlue').style.border = 'blue';
        document.getElementById('cpWhite').style.background = 'white';
        document.getElementById('cpWhite').style.border = 'white';
        document.getElementById('cpBlack').style.background = 'black';
        document.getElementById('cpBlack').style.border = 'black';
        document.getElementById('cpbtn').innerHTML = '◄';
        this.colorsCollapsed = false;
      }
      else {
        document.getElementById('cpGreen').className = 'cpListCollapsed';
        document.getElementById('cpBlue').className = 'cpListCollapsed';
        document.getElementById('cpRed').className = 'cpListCollapsed';
        document.getElementById('cpWhite').className = 'cpListCollapsed';
        document.getElementById('cpBlack').className = 'cpListCollapsed';
        document.getElementById('cpbtn').innerHTML = '►';
        document.getElementById('chatInput').style.width = '603px';
        document.getElementById('chatInput').style.marginLeft = '-5px';
        this.colorsCollapsed = true;
      }
    }

    createDateBox(){
      var div = document.getElementById('output');
      var dateBox = document.createElement('div');
      var date = this.currentDate();
      dateBox.innerText = date;
      dateBox.style.cssText = this.dateBoxStyle;
      div.appendChild(dateBox);
      this.lastDate = date;
    }

    selectColor(color){
      this.color = color;
      document.getElementById('cpbtn').style.background = color;
      document.getElementById('cpbtn').style.borderColor = color;
      if(color == 'white'){
        document.getElementById('cpbtn').style.color = 'black';
        document.getElementById('cpbtn').style.borderColor = '#00802F';
      }
      else {
        document.getElementById('cpbtn').style.color = 'white';
      }
      this.changeColorDropdown();
      document.getElementById('alert').style.visibility = 'visible';
      document.getElementById('alert').style.backgroundColor = 'rgba(0, 128, 47, 0.75)';
      this.alertText = "Die Farbänderung wird erst mit einer Änderung des Nicknames wirksam!";
      setTimeout(this.resetAlert, 8000);
    }

    styleFirstChat(){
      this.initialOutput = '';
      var div = document.getElementById('output');
      div.style.height = '440px';
      div.style.textAlign = 'right';
      div.style.paddingTop = '10px';
      this.createDateBox();
    }

    resetAlert(){
      document.getElementById('alert').style.backgroundColor = 'rgba(255, 80, 80, 0.75)';
      document.getElementById('alert').style.visibility = 'hidden';
    }

    updateScroll(){
      var div = document.getElementById('output');
      div.scrollTop = div.scrollHeight;
    }
}