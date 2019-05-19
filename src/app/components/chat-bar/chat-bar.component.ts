import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { Profile } from '../shared/models/profile';
import { MessageArray } from '../shared/models/messageArray';
import { ApiService } from 'src/app/api.service';
import { responsiveService } from '../shared/services/responsive.service';

@Component({
  selector: 'app-chat-bar',
  templateUrl: './chat-bar.component.html',
  styleUrls: ['./chat-bar.component.css']
})
export class ChatBarComponent implements OnInit {

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
  public response;
  public isMobile: boolean;

  @Output() messageEmitter = new EventEmitter<any[]>();

  constructor(
    private apiService: ApiService,
    private responsiveService: responsiveService,
    ) { }

  ngOnInit(){
    this.onResize();
    this.responsiveService.checkWidth();
  }
  
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
        let msgArrayToSend: MessageArray = new MessageArray();
        msgArrayToSend.msg = this.buildMessageArray();
        this.message = '';
        this.apiService.sendMsg(msgArrayToSend)
        .subscribe(
          (response: MessageArray) => {
            this.response = '';
          })
          return;
      }
    }
    return;
  }

  buildMessageArray(){
    var messageArray = [Profile.UID, this.message];
    console.log(messageArray);
    return messageArray;
  }

  messageCheck(){
    if(!/^\s*$/.test(this.message)){
      if(!this.isMobile){
        document.getElementById('chatInput').className = 'input';
      } else {
        document.getElementById('mblchatInput').className = 'mblinput';
      }
      // if(this.message.length > 65){
      //   this.messageArray = this.message.replace(/.{55}\S*\s+/g, "$&@").split(/\s+@/);
      //   this.longMessage = true;
      // }
      return true;
    } 
    else {
      //document.getElementById('alert').style.visibility = 'visible';
      //this.alertText += " Bitte geben Sie eine Nachricht ein!";
      if(!this.isMobile){
        document.getElementById('chatInput').className = 'alert';
      } else {
        document.getElementById('mblchatInput').className = 'mblalert';
      }
      this.resetInput();
      return false;
    }
  }

  nickCheck(){
    if(!/^\s*$/.test(Profile.Nickname)){
      if(Profile.Nickname.length < 21){
        // document.getElementById('alert').style.visibility = 'hidden';
        // this.alertText = "";
        // if(!this.isMobile){
        //   document.getElementById('nickInput').className = 'nick';
        //   document.getElementById('profileNickDes').className = 'nickName';
        // } else {
        //   document.getElementById('mblnickInput').className = 'mblnick';
        //   document.getElementById('mblprofileNickDes').className = 'mblnickName';
        // }
        return true;
      }  
      else {
        // this.resetAlert();
        // document.getElementById('alert').style.visibility = 'visible';
        // this.alertText = "Der Nickname darf nicht länger als 15 Zeichen sein!";
        if(!this.isMobile){
          document.getElementById('mblnickInput').className = 'nickalert';
          document.getElementById('mblprofileNickDes').className = 'nickNameAlert';
        } else {
          document.getElementById('mblnickInput').className = 'mblnickalert';
          document.getElementById('mblprofileNickDes').className = 'mblnickNameAlert';
        }
        return false;
      }
    }
    else {
      // this.resetAlert();
      // document.getElementById('alert').style.visibility = 'visible';
      // this.alertText = "Nickname darf nicht leer sein!";
      if(!this.isMobile){
        document.getElementById('mblnickInput').className = 'nickalert';
        document.getElementById('mblprofileNickDes').className = 'nickNameAlert';
      } else {
        document.getElementById('mblnickInput').className = 'mblnickalert';
        document.getElementById('mblprofileNickDes').className = 'mblnickNameAlert';
      } 
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

  onResize() {
    this.responsiveService.getMobileStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }
}
