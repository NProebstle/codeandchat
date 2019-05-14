import { Component, OnInit, Input } from '@angular/core';
import { History } from '../shared/models/history';
import { HashLocationStrategy } from '@angular/common';
import { Users } from '../shared/models/users';
import { ChatProfileComponent } from '../chat-profile/chat-profile.component';

@Component({
  selector: 'app-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.css']
})
export class ChatHistoryComponent{

  public newMessage;
  public localHistory: any[];
  public date;
  public color = '#00802F';
  public dateBoxStyle = 'width:max-content;text-align:center;background:rgba(0, 128, 47, 0.8);border-radius:5px;font-size:18px;padding-top:5px;padding-bottom:5px;padding-left:10px;padding-right:10px;color:white;margin: auto;';
  public initializedChatHistory: boolean;
  public numOnline = 'Online: 1';
  public firstChat = true;
  public cache: any[];
  public mergedMessages = 0;
  public divColor;
  public textcolor = '#00802F';
  public initialOutput = 'Noch keine Chats vorhanden 😕';
  public divCounter = 0;
  
  public message = '';
  public lastDate: string;
  public lastTimestamp;
  public longMessage = false;
  public messageArray;
  public nickName = '';
  public output = '';
  public prevMessageID = '';
  public spanNumber;
  public _pullMessage;


  constructor() {}

  // ngOnChanges(changes: SimpleChanges){
  //   console.log('pullMessage change...');
  //   console.log(History.chatHistory);
  //   console.log(History.push);
  //   const pullMessage: SimpleChange = changes.pullMessage;
  //   History.push = pullMessage.currentValue;
  //   if(!pullMessage.isFirstChange()){
  //     this.updateHistory();
  //   }
  // }

  @Input()
  set pullMessage(value: boolean){
    console.log('[INFO] Received Message!');
    this._pullMessage = value;
    if(this.initializedChatHistory){
      this.updateHistory();
    }
    
  }

  ngOnInit(){
    var l = History.chatHistory.length;
    this.date = History.chatHistory[l-2][4];
    if(l > 2){
      this.loadHistory();
    }
    this.initializedChatHistory = true;
  }

  loadHistory(){
    console.log('[INFO] Loading History!')
    this.initialOutput = "Chat-Synchronisierung";
    return;
  }

  updateHistory(){
    var l = History.chatHistory.length;
    if(this.firstChat){
      this.styleFirstChat();
      this.firstChat = false;
    }
    if(!this.compareDate()){
      this.createDateBox();
    }
    if(History.push[0] === Array){
      this.createmultipleMessages();
    } else {
      this.cache = [
        [History.chatHistory[l-2][0], History.chatHistory[l-2][1], History.chatHistory[l-2][2], History.chatHistory[l-2][3], History.chatHistory[l-2][4], History.chatHistory[l-2][5]],
        [History.push[0], History.push[1], History.push[2], History.push[3], History.push[4], History.push[5]]
      ];
      console.log(History.chatHistory);
      console.log(Users.userHistory);
      var cID = 1;
      this.displayMessage(cID);
    }
    return;
  }

  displayMessage(cID){
    console.log('[INFO] Creating new Message!')
    if(cID == 0){
      this.mergedMessages = 0;
      this.createMessageElement();
    } else if(!this.compareDate()){
      this.mergedMessages = 0;
      this.createMessageElement();
    } else if(!this.compareColor()){
      this.mergedMessages = 0;
      this.createMessageElement();
    }else {
      var prevnickName = this.cache[cID-1][0];
      var curnickName = this.cache[cID][0];
      if(prevnickName == curnickName){
        this.mergeMessages(cID);
      } else {
        this.mergedMessages = 0;
        this.createMessageElement();
      }
    }
    return;
  }
  
  createmultipleMessages(){
    console.log('[INFO] Creating multiple messages!');
    var nml = History.push.length;
    var i;
    this.cache = History.push; 
    for(i = 0; i < nml; i++){
      History.push = this.cache[i];
      if(i > 0){
        var prevnickName = this.cache[i-1][0];
        var curnickName = this.cache[i][0]
        if(prevnickName == curnickName){
          var cID = i;
          this.mergeMessages(cID);
        } else {
          this.createMessageElement();
        }
      }
    }
  }
  
  createMessageElement(){
    console.log('[INFO] Creating Message Element!')
    var l = History.chatHistory.length - 2;
    var color = History.push[2];
    var nickName = History.push[0];
    this.divCounter = 0;
    if(color == 'white'){
      this.textcolor = 'black';
      var background = 'white';
      color = 'black';
      this.divColor = 'black';
    } else if(color == 'black'){
      this.textcolor = 'white';
      var background = 'black';
      this.divColor = 'white';
    }
    else {
      this.textcolor = color;
      var background = 'white';
      this.divColor = color;
    }

    var container = document.createElement('div');
    container.id = nickName + l;

    var div = document.createElement('div');
    div.id = container.id + 'div';
    div.style.cssText = 'position:relative;height:100%;padding-bottom:10px;';
    container.appendChild(div);
    
    var nickSpan = document.createElement('span');
    div.appendChild(nickSpan);

    var profilePicture = document.createElement('img');
    profilePicture.src = './assets/profile.png';
    profilePicture.style.cssText = `height: 25px;width: 25px;border: solid 1px;border-radius: 50%;float: left;margin-top: -12px;border-color: ${this.color}`;
    nickSpan.appendChild(profilePicture);

    var header = document.createElement('h4');
    header.innerText = `${History.push[0]}`;
    header.style.cssText = 'position: relative;margin-left: 35px;'
    nickSpan.appendChild(header);

    var chat = document.createElement('p');
    chat.innerText = `${History.push[1]}`;
    div.appendChild(chat);

    var timestamp = document.createElement('span');
    timestamp.style.cssText = `position:absolute;bottom:4px;right:10px;padding-bottom: 5px;font-size: 14px;float: right;`;
    timestamp.innerText = `${History.push[3]}`;
    div.appendChild(timestamp);

    container.style.cssText = `background-color: ${background};border: 1px solid ${color};border-radius: 5px;color: ${this.textcolor};clear: both;float: right;font-family: system-ui;font-size: 18px;line-height: 5px;margin: 5px 0;margin-right: 5px;max-width: 80%;min-width: 300px;padding: 10px;padding-bottom: 5px;padding-top: 0px;position: relative;text-align: left`;
    container.className = 'message-right';
    document.getElementById('output').appendChild(container);
    this.updateScroll();
  }

  compareDate(){
    var l = History.chatHistory.length;
    var curDate = History.chatHistory[l-1][4];
    var prevDate = History.chatHistory[l-2][4];
    if(curDate == prevDate){
      return true;
    } else {
      return false;
    }
  }

  compareColor(){
    var l = History.chatHistory.length;
    var curColor = History.chatHistory[l-1][2];
    var prevColor = History.chatHistory[l-2][2];
    if(curColor == prevColor){
      return true;
    } else {
      return false;
    }
  }


  mergeMessages(cID){
    console.log('[INFO] Merging Messages!');
    this.mergedMessages = this.mergedMessages + 1;
    var prevTimestamp = this.cache[cID-1][3];
    var curTimestamp = this.cache[cID][3];
    var nickName = this.cache[cID][0];
    var cml = this.cache.length;
    var l = History.chatHistory.length;
    var c = l - cml + cID - this.mergedMessages - 1;
    var containerID = nickName + c;
    if(prevTimestamp != curTimestamp){
      this.divCounter = this.divCounter + 1;
      var div = document.createElement('div');
      div.id = containerID + 'div' + this.divCounter;
      div.style.cssText = 'position:relative; height: 100%;padding-bottom:10px;';
      var container = document.getElementById(containerID);
      container.appendChild(div);
      
      var hr = document.createElement('hr');
      hr.style.cssText = `width: 100%;height: 0px; margin: 0px;margin-top: 5px;border-width: 0.5px;border-color:${this.divColor};`;
      div.appendChild(hr);

      var newChat = document.createElement('p');
      newChat.innerText = `${this.cache[cID][1]}`;
      div.appendChild(newChat);

      var timestamp = document.createElement('span');
      timestamp.style.cssText = 'position:absolute;bottom:4px;right:10px;padding-bottom: 5px;font-size: 14px;float: right;';
      timestamp.innerText = `${this.cache[cID][3]}`;
      div.appendChild(timestamp);

      this.updateScroll();

    } else {
      if(this.divCounter != 0){
        var divID = containerID + 'div' + this.divCounter;
      } else {
        var divID = containerID + 'div';
      }
      var divM = document.getElementById(divID);
      var newChat = document.createElement('p');
      newChat.innerText = `${this.cache[cID][1]}`;
      divM.appendChild(newChat);
      this.updateScroll();
    }
    return;

  }

  createDateBox(){
    console.log('[INFO] Creating Date Box');
    var output = document.getElementById('output');
    var div = document.createElement('div');
    div.style.cssText = 'width: 100%;float: right;';
    output.appendChild(div);

    var dateBox = document.createElement('div');
    var l = History.chatHistory.length;
    var date = History.chatHistory[l-1][4];
    dateBox.innerText = date;
    dateBox.style.cssText = this.dateBoxStyle;
    div.appendChild(dateBox);
    this.lastDate = date;
    this.date = date;
  }

  styleFirstChat(){
    this.initialOutput = '';
    var div = document.getElementById('output');
    div.style.height = '440px';
    div.style.textAlign = 'right';
    div.style.paddingTop = '10px';
    return;
  }

  updateScroll(){
    var div = document.getElementById('output');
    div.scrollTop = div.scrollHeight;
  }

  
}
