import { Component, OnInit } from '@angular/core';
import { Profile } from '../shared/models/profile';
import { OverlayIntroService } from '../overlay-intro/overlay-intro.service';
import { OverlayRefM } from '../shared/models/overlayRefM';
import { discoverLocalRefs } from '@angular/core/src/render3/context_discovery';
import { ProfileArray } from '../shared/models/profileArray';
import { ApiService } from '../../api.service';
import { OverlayRefRemote } from 'src/app/overlayRefRemote';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css']
})
export class OverlayComponent implements OnInit {

  public nickname: string;
  public alertText;
  public colorsCollapsed = true;
  public color: string;
  public newColor;
  public prevSelector = 'cpGreen';
  public profileIMGsrc;
  public response;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.nickname = Profile.Nickname;
    this.color = Profile.Color;
    this.profileIMGsrc = Profile.IMG;
  }

  confirm(){
    if(this.nickCheck()){
      this.updateProfile();
      this.styleHeader();
      this.sendProfile();
      let elem = <HTMLElement>document.querySelector('.cdk-overlay-container');
      elem.hidden = true;
      this.ovlRef.close();
    }
    return;
  }

  get ovlRef() :OverlayRefRemote{
    return OverlayRefM.overlayRef;
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

  sendProfile() {
    let profileArrayToSend: ProfileArray = new ProfileArray();
    profileArrayToSend.nickname = Profile.Nickname;
    profileArrayToSend.color = Profile.Color;
    profileArrayToSend.img = Profile.IMG;
    profileArrayToSend.uid = Profile.UID;

    this.apiService.addProfile(profileArrayToSend)
    .subscribe(
      (response: ProfileArray) => {
        this.response = '';
      }
    )
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
    var img = document.getElementById('ovlprofileIMGselector');
    img.className='profileIMGhover';
  }

  imgMouseLeave(){
    var img = document.getElementById('ovlprofileIMGselector');
    img.className = 'profileIMG';
  }

  softnickCheck(){
    if(!/^\s*$/.test(this.nickname)){
     if(this.nickname.length < 16){
        // document.getElementById('profileAlert').style.visibility = 'hidden';
        this.alertText = "";
        document.getElementById('ovlnickInput').className = 'nick';
        document.getElementById('ovlprofileNickDes').className = 'nickName';
        return true;
      }  
      else {
        // document.getElementById('profileAlert').style.visibility = 'visible';
        this.alertText = "Dein Nickname darf maximal 15 Zeichen lang sein!";
        document.getElementById('ovlnickInput').className = 'nickalert';
        document.getElementById('ovlprofileNickDes').className = 'nickNameAlert';
        return false;
      }
    }
    return false;
  }

  nickCheck(){
    if(this.nickname != undefined){
      if(!/^\s*$/.test(this.nickname)){
        if(this.nickname.length < 16){
          // document.getElementById('profileAlert').style.visibility = 'hidden';
          this.alertText = "";
          document.getElementById('ovlnickInput').className = 'nick';
          document.getElementById('ovlprofileNickDes').className = 'nickName';
          return true;
        }  
        else {
          //this.resetAlert();
          // document.getElementById('profileAlert').style.visibility = 'visible';
          this.alertText = "Dein Nickname darf maximal 15 Zeichen lang sein!";
          document.getElementById('ovlnickInput').className = 'nickalert';
          document.getElementById('profileNickDes').className = 'nickNameAlert';
          return false;
        }
      } else {
        //this.resetAlert();
        // document.getElementById('profileAlert').style.visibility = 'visible';
        this.alertText = "Bitte gib einen Nicknamen ein!";
        document.getElementById('ovlnickInput').className = 'nickalert';
        document.getElementById('ovlprofileNickDes').className = 'nickNameAlert';
        return false;
      }
    }
    else {
      //this.resetAlert();
      // document.getElementById('profileAlert').style.visibility = 'visible';
      this.alertText = "Bitte gib einen Nicknamen ein!";
      document.getElementById('ovlnickInput').className = 'nickalert';
      document.getElementById('ovlprofileNickDes').className = 'nickNameAlert';
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
    document.getElementById('ovlcpColorDiv').style.background = selColor;
    document.getElementById('ovlcpColorDiv').style.borderColor = selColor;
    if(selColor == 'white'){
      document.getElementById('ovlcpColorDiv').style.borderColor = '#00802F';
      document.getElementById('ovlcpColorDiv').style.background = selColor;
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
    document.getElementById('ovlcpColorDiv').style.background = this.color;
    document.getElementById('ovlcpColorDiv').style.borderColor = this.color;
    if(this.color == 'white'){
      document.getElementById('ovlcpColorDiv').style.borderColor = '#00802F';
      document.getElementById('ovlcpColorDiv').style.background = this.color;
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
