import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Profile } from '../shared/models/profile';

@Component({
  selector: 'app-chat-bar',
  templateUrl: './chat-bar.component.html',
  styleUrls: ['./chat-bar.component.css']
})
export class ChatBarComponent {

  public alertText = '404';
  public colorsCollapsed = true;
  public color = '#00802F';
  public divColor;
  public textcolor = '#00802F';
  public message = '';
  public longMessage = false;
  public messageArray;
  public mergedMessages = 0;
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
    var messageArray = [Profile.UID, this.message];
    return messageArray;
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
    if(!/^\s*$/.test(Profile.Nickname)){
      if(Profile.Nickname.length < 16){
        // document.getElementById('alert').style.visibility = 'hidden';
        // this.alertText = "";
        document.getElementById('nickInput').className = 'nick';
        document.getElementById('profileNickDes').className = 'nickName';
        return true;
      }  
      else {
        // this.resetAlert();
        // document.getElementById('alert').style.visibility = 'visible';
        // this.alertText = "Der Nickname darf nicht länger als 15 Zeichen sein!";
        document.getElementById('nickInput').className = 'nickalert';
        document.getElementById('profileNickDes').className = 'nickNameAlert';
        return false;
      }
    }
    else {
      // this.resetAlert();
      // document.getElementById('alert').style.visibility = 'visible';
      // this.alertText = "Nickname darf nicht leer sein!";
      document.getElementById('nickInput').className = 'nickalert';
      document.getElementById('profileNickDes').className = 'nickNameAlert';
      return false;
    }
  }
  // resetAlert(){
  //   document.getElementById('alert').style.backgroundColor = 'rgb(220, 70, 70)';
  //   document.getElementById('alert').style.visibility = 'hidden';
  // }

  resetInput(){
    this.message = "";
  }

}
