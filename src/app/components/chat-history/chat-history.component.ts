import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.css']
})
export class ChatHistoryComponent implements OnInit{

  public newMessage;
  public localHistory: any[];
  public date;
  public color = '#00802F';
  public dateBoxStyle = 'width:max-content;text-align:center;background:rgba(0, 128, 47, 0.8);border-radius:5px;font-size:18px;padding-top:5px;padding-bottom:5px;padding-left:10px;padding-right:10px;color:white;margin: 0 auto;';
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


  constructor() {}

  // ngOnChanges(changes: SimpleChanges){
  //   console.log('pullMessage change...');
  //   console.log(this.localHistory);
  //   console.log(this.newMessage);
  //   const pullMessage: SimpleChange = changes.pullMessage;
  //   this.newMessage = pullMessage.currentValue;
  //   if(!pullMessage.isFirstChange()){
  //     this.updateHistory();
  //   }
  // }

  @Input()
  set pullMessage(pullMessage: any[]){
    this.newMessage = pullMessage;
    console.log('[INFO] Pulled new Message!');
    console.log('[VAR] newMessage:');
    console.log(this.newMessage);
    if(this.initializedChatHistory){
      this.updateHistory();
    }
  }

  ngOnInit(){
    console.log('[INFO] Initializing chat-history');
    this.localHistory = this.newMessage;
    console.log('[VAR] localHistory:')
    console.log(this.localHistory);
    var l = this.localHistory.length;
    this.date = this.localHistory[l-2][4];
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
    console.log('[INFO] Updating History!');
    console.log('[VAR] localHistory:')
    console.log(this.localHistory);
    //this.localHistory.push(this.newMessage);
    //console.log(this.localHistory);
    var l = this.localHistory.length;
    if(this.firstChat){
      this.styleFirstChat();
      this.firstChat = false;
    }
    if(!this.compareDate()){
      this.createDateBox();
    }
    if(this.newMessage[0] === Array){
      this.createmultipleMessages();
    } else {
      this.cache = [
        [this.localHistory[l-2][0], this.localHistory[l-2][1], this.localHistory[l-2][2], this.localHistory[l-2][3], this.localHistory[l-2][4]],
        [this.newMessage[0], this.newMessage[1], this.newMessage[2], this.newMessage[3], this.newMessage[4]]
      ];
      var cID = 1;
      this.createMessage(cID);
    }
    return;
  }

  createMessage(cID){
    console.log('[INFO] Creating new Message!')
    if(cID == 0){
      this.createMessageElement();
    } else {
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
    var nml = this.newMessage.length;
    var i;
    this.cache = this.newMessage; 
    for(i = 0; i < nml; i++){
      this.newMessage = this.cache[i];
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
    var l = this.localHistory.length - 2;
    var color = this.newMessage[2];
    var nickName = this.newMessage[0];
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
    
    var header = document.createElement('h4');
    header.innerText = `${this.newMessage[0]}`;
    div.appendChild(header);

    var chat = document.createElement('p');
    chat.innerText = `${this.newMessage[1]}`;
    div.appendChild(chat);

    var timestamp = document.createElement('span');
    timestamp.style.cssText = `position:absolute;bottom:4px;right:10px;padding-bottom: 5px;font-size: 14px;float: right;`;
    timestamp.innerText = `${this.newMessage[3]}`;
    div.appendChild(timestamp);

    container.style.cssText = `align-self: right;background-color: ${background};border: 1px solid ${color};border-radius: 5px;color: ${this.textcolor};clear: both;float: right;font-family: system-ui;font-size: 18px;line-height: 5px;margin: 5px 0;max-width: 80%;min-width: 300px;padding: 10px;padding-bottom: 5px;padding-top: 0px;position: relative;text-align: left`;
    container.className = 'message-right';
    document.getElementById('output').appendChild(container);
    this.updateScroll();
  }

  compareDate(){
    console.log('[INFO] Comparing Date!')
    var l = this.localHistory.length;
    var curDate = this.localHistory[l-1][4];
    var prevDate = this.localHistory[l-2][4];
    if(curDate == prevDate){
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
    var l = this.localHistory.length;
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
  // createMessageElement(){

  //   this.containerCounter = this.containerCounter + 1;
  //   this.lastTimestamp = this.currentTimestamp();
  //   var container = document.createElement('div');
  //   container.id = this.nickName + this.containerCounter;

  //   this.divCounter = this.divCounter + 1;
  //   var div = document.createElement('div');
  //   div.id = this.nickName + this.divCounter + 'div';
  //   div.style.cssText = '';
  //   container.appendChild(div);

  //   var header = document.createElement('h4');
  //   header.innerText = `${this.nickName}:`;
  //   div.appendChild(header);

  //   var chat = document.createElement('p');
  //   chat.innerText = `${this.output}`;
  //   div.appendChild(chat);

  //   this.spanNumber = 0;
  //   var timestamp = document.createElement('span');
  //   timestamp.style.cssText = '';
  //   timestamp.innerText = `${this.lastTimestamp}`;
  //   div.appendChild(timestamp);

  //   container.style.cssText = ``;
  //   container.className = 'message-right';
  //   document.getElementById('output').appendChild(container);
  //   this.prevMessageID = container.id;
  //   this.mergedMessages = 0;
  //   this.updateScroll();
  // }

  // mergeMessages(){
  //   this.mergedMessages = this.mergedMessages + 1;
  //   if(this.lastTimestamp != this.currentTimestamp()){
  //     this.divCounter = this.divCounter + 1;
  //     var div = document.createElement('div');
  //     div.id = this.nickName + this.divCounter + 'div';
  //     div.style.cssText = 'position:relative; height: 100%;padding-bottom:10px;';
  //     var containerID = this.nickName + this.containerCounter;
  //     var container = document.getElementById(containerID);
  //     container.appendChild(div);

  //     var hr = document.createElement('hr');
  //     hr.style.cssText = `width: 100%;height: 0px; margin: 0px;margin-top: 5px;border-width: 0.5px;border-color:${this.divColor};`;
  //     div.appendChild(hr);

  //     var newChat = document.createElement('p');
  //     newChat.innerText = `${this.output}`;
  //     div.appendChild(newChat);

  //     this.lastTimestamp = this.currentTimestamp();
  //     var timestamp = document.createElement('span');
  //     timestamp.style.cssText = 'position:absolute;bottom:4px;right:10px;padding-bottom: 5px;font-size: 14px;float: right;';
  //     timestamp.innerText = `${this.lastTimestamp}`;
  //     div.appendChild(timestamp);

  //     this.updateScroll();
  //   }
  //   else {
  //     var divID = this.nickName + this.divCounter + 'div';
  //     var divM = document.getElementById(divID);
  //     var newChat = document.createElement('p');
  //     newChat.innerText = `${this.output}`;
  //     divM.appendChild(newChat);
  //     this.updateScroll();
  //   }
  // }

  // createMessage(){
  //   var c = this.containerCounter;
  //   var checkID = this.nickName + this.containerCounter;
  //   var a = this.localHistory.length;
  //   if(this.lastDate != this.localHistory[a-1][4]){
  //     this.createDateBox();
  //     this.createMessageElement();
  //   } 
  //   else {
  //     if(c == 0){
  //       this.createMessageElement();
  //     }
  //     else if(this.prevMessageID == checkID){
  //      this.mergeMessages();
  //     }
  //     else {
  //      this.createMessageElement();
  //     }
  //   }
  // }

  createDateBox(){
    console.log('[INFO] Creating Date Box');
    var div = document.getElementById('output');
    var dateBox = document.createElement('div');
    var l = this.localHistory.length;
    var date = this.localHistory[l-1][4];
    dateBox.innerText = date;
    dateBox.style.cssText = this.dateBoxStyle;
    div.appendChild(dateBox);
    this.lastDate = date;
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
