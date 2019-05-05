import { Component, OnInit } from '@angular/core';
import { Profile } from '../shared/models/profile';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  constructor() { }

  ngOnInit(){
    var img = document.getElementById('profilemenuIMG');
    img.className = 'profilemenuHover';
    var img = document.getElementById('profilemenuIMG');
    img.className = 'profilemenu';
  }

  get nickname(){
    return Profile.Nickname;
  }

  get profileIMG(){
    return Profile.IMG;
  }

  get profileColor(){
    return Profile.Color;
  }

  imgMouseEnter(){
    var img = document.getElementById('profilemenuIMG');
    img.className = 'profilemenuHover';
  }

  imgMouseLeave(){
    var img = document.getElementById('profilemenuIMG');
    img.className = 'profilemenu';
  }

  openMenu(){
    var container = document.getElementById('profileContainer');
    var hidden = container.hidden;
    if(hidden){
      document.getElementById('profileContainer').hidden = false;
    } else {
      document.getElementById('profileContainer').hidden = true;
    }
  }
}
