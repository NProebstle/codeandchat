import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Profile } from '../shared/models/profile';
import { environment } from '../../../environments/environment';
import { OverlayService } from '../overlay/overlay.service';
import { OverlayComponent } from '../overlay/overlay.component';
import { OverlayIntroService } from '../overlay-intro/overlay-intro.service';
import { ApiService } from 'src/app/api.service';
import { ProfileArray } from '../shared/models/profileArray';


@Component({
  selector: 'app-chat-profile',
  templateUrl: './chat-profile.component.html',
  styleUrls: ['./chat-profile.component.css']
})
export class ChatProfileComponent implements OnInit{

  constructor(private apiService: ApiService) { }

  public nickname: string;
  public alertText;
  public colorsCollapsed = true;
  public color: string;
  public newColor;
  public prevSelector = 'cpGreen';
  public profileIMGsrc: string;
  public firstUpdate = true;
  public response;

  ngOnInit(){
    this.generateUID();
    console.log('Init profile');
  }

  updateData(){
    if(this.firstUpdate){
    this.nickname = Profile.Nickname;
    this.color = Profile.Color;
    this.profileIMGsrc = Profile.IMG;
    this.firstUpdate = false;
    }
  }

  cancel(){
    document.getElementById('profileContainer').hidden = true;
    this.resetCp();
    this.resetNick();
    return;
  } 

  confirm(){
    if(this.nickCheck()){
      this.updateProfile();
      document.getElementById('profileContainer').hidden = true;
      this.styleHeader();
      this.sendProfile();
    }
    return;
  }

  updateProfile(){
    Profile.Nickname = this.nickname;
    Profile.Color = this.color;
    return;
  }

  generateUID(){
    var date = new Date().getTime();
    var uid = 'xx-xxxxxx-xxxx-xxxx-yxxxxx-xxxx-xxxxx'.replace(/[xy]/g, function(c) {
        var r = (date + Math.random()*16)%16 | 0;
        date = Math.floor(date/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    Profile.UID = uid;
    return;
  }

  get uid(){
    return Profile.UID;
  }

  sendProfile(){
    let profileArrayToSend: ProfileArray = new ProfileArray();
    profileArrayToSend.profile = [Profile.Nickname, Profile.Color, Profile.IMG, Profile.UID];

    this.apiService.addProfile(profileArrayToSend)
    .subscribe(
      (response: ProfileArray) => {
        this.response = '';
      })
      return;
    }

  styleHeader(){
    if(this.color != "white"){
      var div = document.getElementById('headerColorDiv');
      div.style.backgroundColor = this.color;
      div.style.borderWidth = "0";
      return;
    } else {
      var div = document.getElementById('headerColorDiv')
      div.style.backgroundColor = this.color;
      div.style.borderStyle = "solid";
      div.style.borderWidth = "1px";
      div.style.borderColor = "black";
      return;
    }
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
    if(!/^\s*$/.test(this.nickname)){
     if(this.nickname.length < 21){
        // document.getElementById('profileAlert').style.visibility = 'hidden';
        // this.alertText = "";
        document.getElementById('nickInput').className = 'nick';
        document.getElementById('profileNickDes').className = 'nickName';
        return true;
      }  
      else {
        // document.getElementById('profileAlert').style.visibility = 'visible';
        // this.alertText = "Der Nickname darf nicht länger als 15 Zeichen sein!";
        document.getElementById('nickInput').className = 'nickalert';
        document.getElementById('profileNickDes').className = 'nickNameAlert';
        return false;
      }
    }
    return false;
  }

  nickCheck(){
    if(this.nickname != undefined){
      if(!/^\s*$/.test(this.nickname)){
        if(this.nickname.length < 19){
          // document.getElementById('profileAlert').style.visibility = 'hidden';
          // this.alertText = "";
          document.getElementById('nickInput').className = 'nick';
          document.getElementById('profileNickDes').className = 'nickName';
          return true;
        }  
        else {
          //this.resetAlert();
          // document.getElementById('profileAlert').style.visibility = 'visible';
          // this.alertText = "Der Nickname darf nicht länger als 15 Zeichen sein!";
          document.getElementById('nickInput').className = 'nickalert';
          document.getElementById('profileNickDes').className = 'nickNameAlert';
          return false;
        }
      } else {
        //this.resetAlert();
        // document.getElementById('profileAlert').style.visibility = 'visible';
        // this.alertText = "Der Nickname darf nicht länger als 15 Zeichen sein!";
        document.getElementById('nickInput').className = 'nickalert';
        document.getElementById('profileNickDes').className = 'nickNameAlert';
        return false;
      }
    }
    else {
      //this.resetAlert();
      // document.getElementById('profileAlert').style.visibility = 'visible';
      // this.alertText = "Nickname darf nicht leer sein!";
      document.getElementById('nickInput').className = 'nickalert';
      document.getElementById('profileNickDes').className = 'nickNameAlert';
      return false;
    }
  }

  keyEnterNick(){
    this.delEnterNick();
    this.confirm();
  }

  delEnterNick(){
    var nicklength = this.nickname.length;
    var splitNick = this.nickname.substring(0, nicklength-1);
    this.nickname = splitNick;
    return;
  }

  selectColor(selColor, selector){
    this.color = selColor;
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
    //this.colorAlert();
    return;
  }

  // colorAlert(){
  //   if(this.color != this.newColor){
  //     document.getElementById('profileAlert').style.visibility = 'visible';
  //     document.getElementById('profileAlert').style.backgroundColor = 'rgba(0, 128, 47, 0.75)';
  //     this.alertText = "Die Farbänderung wird erst mit einer Änderung des Nicknames wirksam!";
  //     setTimeout(this.resetAlert, 5000);
  //   }
  //   return;
  // }

  // resetAlert(){
  //   document.getElementById('profileAlert').style.backgroundColor = 'rgba(201, 45, 43, 0.75)';
  //   document.getElementById('profileAlert').style.visibility = 'hidden';
  //   return;
  // }

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
      this.nickname = '';
    }
    //this.resetAlert();
    document.getElementById('profileAlert').style.visibility = 'hidden';
    this.alertText = "";
    document.getElementById('nickInput').className = 'nick';
    document.getElementById('profileNickDes').className = 'nickName';
    return;
  }
}