import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor() { }

  imgMouseEnter(){
    var img = document.getElementById('profilemenuIMG');
    img.className = 'profilemenuHover';
  }

  imgMouseLeave(){
    var img = document.getElementById('profilemenuIMG');
    img.className = 'profilemenu';
  }

  public openMenu(){
    var container = document.getElementById('profileContainer');
    var hidden = container.hidden;
    if(hidden){
      document.getElementById('profileContainer').hidden = false;
    } else {
      document.getElementById('profileContainer').hidden = true;
    }
  }
}
