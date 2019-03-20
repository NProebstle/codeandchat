import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  constructor() {
  }
    send(chat_output, chat_input: string){
      document.getElementById(chat_output).innerHTML = chat_input;
      // alert(chat_input);
    }
}