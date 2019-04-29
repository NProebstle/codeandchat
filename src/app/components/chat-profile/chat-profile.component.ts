import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-chat-profile',
  templateUrl: './chat-profile.component.html',
  styleUrls: ['./chat-profile.component.css']
})
export class ChatProfileComponent {

  constructor() { }

  public nickName = '';
  public alertText;
  public colorsCollapsed = true;
  public color = '#00802F';
  public newColor;
  public prevSelector = 'cpGreen';
  public profileIMGsrc;

  @Output() profileEmitter = new EventEmitter<any>();


  cancel(){
    document.getElementById('profileContainer').hidden = true;
    this.resetCp();
    this.resetNick();
    return;
  } 

  confirm(){
    if(this.nickCheck()){
      this.profileEmitter.emit(this.buildProfileArray());
    }
    return;
  }

  buildProfileArray(){
    var profileArray = [this.nickName, this.color];
    return profileArray;
  }

  changeIMG(event){
    // var input = document.getElementById('profileIMGinput');
    // var fReader = new FileReader();
    // fReader.readAsDataURL(input.files[0]);
    // fReader.onloadend = function(event){ 
    // var img = document.getElementById('profileMenuIMG'); 
    // img.src = event.target.result; 
  //}

    // var src = document.getElementById('profileIMGinput').files[0].name;
    // console.log(src);
    // document.getElementById('profileMenuIMG').src = src;
  }

  imgMouseEnter(){
    var img = document.getElementById('profileIMGselector');
    img.className='profileIMGhover';
  }

  imgMouseLeave(){
    var img = document.getElementById('profileIMGselector');
    img.className = 'profileIMG';
  }

  softnickCheck(){
    if(!/^\s*$/.test(this.nickName)){
     if(this.nickName.length < 16){
        document.getElementById('profileAlert').style.visibility = 'hidden';
        this.alertText = "";
        document.getElementById('nickInput').className = 'nick';
        document.getElementById('profileNickDes').className = 'nickName';
        return true;
      }  
      else {
        document.getElementById('profileAlert').style.visibility = 'visible';
        this.alertText = "Der Nickname darf nicht länger als 15 Zeichen sein!";
        document.getElementById('nickInput').className = 'nickalert';
        document.getElementById('profileNickDes').className = 'nickNameAlert';
        return false;
      }
    }
    return false;
  }

  nickCheck(){
    if(!/^\s*$/.test(this.nickName)){
      if(this.nickName.length < 16){
        document.getElementById('profileAlert').style.visibility = 'hidden';
        this.alertText = "";
        document.getElementById('nickInput').className = 'nick';
        document.getElementById('profileNickDes').className = 'nickName';
        return true;
      }  
      else {
        this.resetAlert();
        document.getElementById('profileAlert').style.visibility = 'visible';
        this.alertText = "Der Nickname darf nicht länger als 15 Zeichen sein!";
        document.getElementById('nickInput').className = 'nickalert';
        document.getElementById('profileNickDes').className = 'nickNameAlert';
        return false;
      }
    }
    else {
      this.resetAlert();
      document.getElementById('profileAlert').style.visibility = 'visible';
      this.alertText = "Nickname darf nicht leer sein!";
      document.getElementById('nickInput').className = 'nickalert';
      document.getElementById('profileNickDes').className = 'nickNameAlert';
      return false;
    }
  }

  delEnterNick(){
    var nicklength = this.nickName.length;
    var splitNick = this.nickName.substring(0, nicklength-1);
    this.nickName = splitNick;
    return;
  }

  selectColor(selColor, selector){
    this.newColor = selColor;
    document.getElementById('cpColorDiv').style.background = selColor;
    document.getElementById('cpColorDiv').style.borderColor = selColor;
    if(selColor == 'white'){
      document.getElementById('cpColorDiv').style.borderColor = '#00802F';
      document.getElementById('cpColorDiv').style.background = selColor;
    }
    var x = document.getElementsByClassName("cpList");
    var i;
    for(i = 0; i < x.length; i++){
      x[i].innerHTML = "";
    }
    document.getElementById(selector).innerText = "✓";
    this.colorAlert();
    return;
  }

  colorAlert(){
    if(this.color != this.newColor){
      document.getElementById('profileAlert').style.visibility = 'visible';
      document.getElementById('profileAlert').style.backgroundColor = 'rgba(0, 128, 47, 0.75)';
      this.alertText = "Die Farbänderung wird erst mit einer Änderung des Nicknames wirksam!";
      setTimeout(this.resetAlert, 8000);
    }
    return;
  }

  resetAlert(){
    document.getElementById('profileAlert').style.backgroundColor = 'rgba(201, 45, 43, 0.75)';
    document.getElementById('profileAlert').style.visibility = 'hidden';
    return;
  }

  resetCp(){
    var x = document.getElementsByClassName("cpList");
    var i;
    for(i = 0; i < x.length; i++){
      x[i].innerHTML = "";
    }
    document.getElementById(this.prevSelector).innerText = "✓";
    document.getElementById('cpColorDiv').style.background = this.color;
    document.getElementById('cpColorDiv').style.borderColor = this.color;
    if(this.color == 'white'){
      document.getElementById('cpColorDiv').style.borderColor = '#00802F';
      document.getElementById('cpColorDiv').style.background = this.color;
    }
    return;
  }

  resetNick(){
    if(!this.softnickCheck()){
      this.nickName = '';
    }
    this.resetAlert();
    document.getElementById('profileAlert').style.visibility = 'hidden';
    this.alertText = "";
    document.getElementById('nickInput').className = 'nick';
    document.getElementById('profileNickDes').className = 'nickName';
    return;
  }
}