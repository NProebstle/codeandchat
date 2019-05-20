import { Component, OnInit } from '@angular/core';
import { Profile } from '../shared/models/profile';
import { OverlayService } from '../overlay/overlay.service';
import { ChatProfileComponent } from '../chat-profile/chat-profile.component';
import { responsiveService } from '../shared/services/responsive.service';
import { OverlayRefM } from '../shared/models/overlayRefM';
import { OverlayRefRemote } from 'src/app/overlayRefRemote';
import { OverlayProfileService } from '../overlay-profile/overlay-profile.service';
import { Visibility } from '../shared/models/visibility';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  public isMobile: boolean;
  public prevOnlinevis: boolean;

  constructor(
    private responsiveService: responsiveService,
    private profileOverlayService: OverlayProfileService,
    ) { }

  ngOnInit(){
    this.onResize();
    this.responsiveService.checkWidth();
    this.prevOnlinevis = Visibility.showOnline;
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
    if(!this.isMobile){
      if(Visibility.showProfile){
        if(this.prevOnlinevis){
          Visibility.showOnline = true;
        }
        Visibility.showProfile = false;
      } else {
        Visibility.showProfile = true;
        this.prevOnlinevis =  Visibility.showOnline;
        Visibility.showOnline = false;
      }
    } else {
      let overlayRef: OverlayRefRemote = this.profileOverlayService.open();
      this.setovlRef(overlayRef);
      let elem = <HTMLElement>document.querySelector('.cdk-overlay-container');
      elem.hidden = false;
    }
  }

  setovlRef(ref){
    OverlayRefM.overlayRef = ref;
  }

  onResize() {
    this.responsiveService.getMobileStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }
}
