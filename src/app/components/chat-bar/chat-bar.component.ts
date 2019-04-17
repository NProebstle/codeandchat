import { Component, Output, EventEmitter } from '@angular/core';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-chat-bar',
  templateUrl: './chat-bar.component.html',
  styleUrls: ['./chat-bar.component.css']
})
export class ChatBarComponent {

  public alertText;
  public colorsCollapsed = true;
  public color = '#00802F';
  public divColor;
  public textcolor = '#00802F';
  public message = '';
  public longMessage = false;
  public messageArray;
  public mergedMessages = 0;
  public nickName = '';
  public output = '';
  public prevMessageID = '';
  public spanNumber;

  @Output() messageEmitter = new EventEmitter<any[]>();

  constructor() { }

  send(){
    if(this.nickCheck() && this.messageCheck()){
      if(this.longMessage){
        var i;
        for(i = 0; i < this.messageArray.length; i++){
          this.message = this.messageArray[i];
          this.messageEmitter.emit(this.buildMessageArray());
        }
        this.longMessage = false;
      } else {
        this.messageEmitter.emit(this.buildMessageArray());
        this.message = '';
      }
    }
    return;
  }

  buildMessageArray(){
    var messageArray = [this.nickName, this.message, this.color];
    return messageArray;
  }

  // OLDsend(){
  //   if(this.nickCheck() && this.messageCheck()){
  //     if(this.containerCounter == 0){
  //     this.styleFirstChat();
  //     }
  //     if(!this.longMessage){
  //       this.output = this.message;
  //       this.message = '';
  //       this.createMessage();
  //     }
  //     else {
  //       var numofMessages = this.messageArray.length;
  //       var i;
  //       for(i = 0; i < numofMessages; i++){
  //         this.output = this.messageArray[i];
  //         this.createMessage();
  //       }
  //       this.message = '';
  //       this.messageArray = null;
  //       this.longMessage = false;
  //     }
  //   }
  // }      

  changeColorDropdown(){
    if(this.colorsCollapsed){
      document.getElementById('cpGreen').className = 'cpList';
      document.getElementById('cpBlue').className = 'cpList';
      document.getElementById('cpRed').className = 'cpList';
      document.getElementById('cpWhite').className = 'cpList';
      document.getElementById('cpBlack').className = 'cpList';
      document.getElementById('chatInput').style.width = '478px';
      document.getElementById('chatInput').style.marginLeft = '0px';
      document.getElementById('cpOrange').style.background = 'rgb(220, 120, 60)';
      document.getElementById('cpOrange').style.border = 'rgb(220, 120, 60)';
      document.getElementById('cpRed').style.background = 'rgb(220, 70, 70)';
      document.getElementById('cpRed').style.border = 'rgb(220, 70, 70)';
      document.getElementById('cpBlue').style.background = 'rgb(0, 160, 210)';
      document.getElementById('cpBlue').style.border = 'rgb(0, 160, 210)';
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
      document.getElementById('cpOrange').className = 'cpListCollapsed';
      document.getElementById('cpWhite').className = 'cpListCollapsed';
      document.getElementById('cpBlack').className = 'cpListCollapsed';
      document.getElementById('cpRed').className = 'cpListCollapsed';
      document.getElementById('cpbtn').innerHTML = '►';
      document.getElementById('chatInput').style.width = '603px';
      document.getElementById('chatInput').style.marginLeft = '-5px';
      this.colorsCollapsed = true;
    }
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
      this.resetInput();
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

  softnickCheck(){
    if(!/^\s*$/.test(this.nickName)){
     if(this.nickName.length < 16){
        document.getElementById('alert').style.visibility = 'hidden';
        this.alertText = "";
        document.getElementById('nickInput').className = 'nick';
      }  
      else {
        document.getElementById('alert').style.visibility = 'visible';
        this.alertText = "Der Nickname darf nicht länger als 15 Zeichen sein!";
        document.getElementById('nickInput').className = 'nickalert';
      }
    }
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

  resetAlert(){
    document.getElementById('alert').style.backgroundColor = 'rgba(255, 80, 80, 0.75)';
    document.getElementById('alert').style.visibility = 'hidden';
  }

  delEnterNick(){
    var nicklength = this.nickName.length;
    var splitNick = this.nickName.substring(0, nicklength-1);
    this.nickName = splitNick;
  }

  resetInput(){
    this.message = "";
  }

}
