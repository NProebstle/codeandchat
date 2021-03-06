import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Profile } from '../shared/models/profile';
import { environment } from '../../../environments/environment';
import { OverlayService } from '../overlay/overlay.service';
import { OverlayComponent } from '../overlay/overlay.component';
import { OverlayIntroService } from '../overlay-intro/overlay-intro.service';
import { ApiService } from 'src/app/api.service';
import { ProfileArray } from '../shared/models/profileArray';
import { Visibility } from '../shared/models/visibility';
import { InitApp } from '../shared/models/init';


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
  public prevOnlinevis: boolean;

  ngOnInit(){
    this.generateUID();
    this.setColorSelector();
    this.prevOnlinevis = Visibility.showOnline;
    console.log('[INIT] Component: profile!');
    this.updateData();
  }

  updateData(){
    this.nickname = Profile.Nickname;
    this.color = Profile.Color;
    this.profileIMGsrc = Profile.IMG;
  }

  cancel(){
    Visibility.showProfile = false;
    this.resetCp();
    this.resetNick();
    return;
  } 

  confirm(){
    if(this.nickCheck()){
      this.updateProfile();
      if(this.prevOnlinevis){
        Visibility.showOnline = true;
      }
      Visibility.showProfile = false;
      this.styleHeader();
      this.sendProfile();
    }
    return;
  }

  setColorSelector(){
    var lclcolor = Profile.Color;
    var green = '#00802F';
    var lightGreen = 'rgb(156, 230, 61)';
    var yellow = 'rgb(217, 219, 71)';
    var blue = 'rgb(0, 160, 210)';
    var darkBlue = 'rgb(83, 115, 219)';
    var violett = 'rgb(135, 76, 230)';
    var pink = 'rgb(235, 109, 218)';
    var orange = 'rgb(220, 120, 60)';
    var red = 'rgb(220, 70, 70)';
    document.getElementById('cpColorDiv').style.background = lclcolor;
    document.getElementById('cpColorDiv').style.borderColor = lclcolor;
    if(lclcolor == 'white'){
      document.getElementById('cpColorDiv').style.borderColor = '#00802F';
      document.getElementById('cpColorDiv').style.background = lclcolor;
    }
    var x = document.getElementsByClassName("cpList");
    var i;
    for(i = 0; i < x.length; i++){
      x[i].innerHTML = "";
    }
    if(lclcolor == green){
      document.getElementById('cpGreen').innerText = "✓";
    } else if(lclcolor == lightGreen){
        document.getElementById('cpLightGreen').innerText = "✓";
    } else if(lclcolor == yellow){
        document.getElementById('cpLightYellow').innerText = "✓";
    } else if(lclcolor == blue){
        document.getElementById('cpBlue').innerText = "✓";
    } else if(lclcolor == darkBlue){
        document.getElementById('cpDarkBlue').innerText = "✓";
    } else if(lclcolor == violett){
        document.getElementById('cpViolett').innerText = "✓";
    } else if(lclcolor == pink){
        document.getElementById('cpPink').innerText = "✓";
    } else if(lclcolor == orange){
        document.getElementById('cpOrange').innerText = "✓";
    } else if(lclcolor == red){
        document.getElementById('cpRed').innerText = "✓";
    } else if(lclcolor == 'white'){
        document.getElementById('cpWhite').innerText = "✓"; 
    } else if(lclcolor == 'black'){
        document.getElementById('cpBlack').innerText = "✓";
    }
    return;
  }

  updateProfile(){
    Profile.Nickname = this.nickname;
    Profile.Color = this.color;
    return;
  }

  generateUID(){
    if(!InitApp.initApp){
      var date = new Date().getTime();
      var uid = 'xx-xxxxxx-xxxx-xxxx-yxxxxx-xxxx-xxxxx'.replace(/[xy]/g, function(c) {
      var r = (date + Math.random()*16)%16 | 0;
      date = Math.floor(date/16);
      return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    Profile.UID = uid;
    InitApp.initApp = true;
    return;
    }
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
     if(this.nickname.length < 19){
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