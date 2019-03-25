import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  public message = '';
  public output = 'Noch keine Chats vorhanden 😕';
  public firstmessage = false;

  //this.chatmessage = '';

  constructor() {
  }
    send(firstmessage, output, message){
      if(message.length > 0){
        if(firstmessage == false){
        this.output = '';
        document.getElementById('output').style.height = '440px';
        document.getElementById('output').style.textAlign = 'right';
        document.getElementById('output').style.paddingTop = '10px';
        this.setflagfalse(firstmessage);
      }
        document.getElementById('chatInput').className = 'input';
        this.output = message;
        this.message = '';
        return output;
      } 
      else {
        document.getElementById('chatInput').className = 'alert';
      }      
    }

    setflagfalse(firstmessage){
      firstmessage = false;
      return firstmessage;
    }
}