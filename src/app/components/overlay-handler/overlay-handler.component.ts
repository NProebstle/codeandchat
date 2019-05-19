import { Component, OnInit } from '@angular/core';
import { OverlayIntroService } from '../overlay-intro/overlay-intro.service';
import { OverlayService } from '../overlay/overlay.service';
import { OverlayRefRemote } from '../../overlayRefRemote';
import { OverlayRefM } from '../shared/models/overlayRefM';
import { responsiveService } from '../shared/services/responsive.service';

@Component({
  selector: 'app-overlay-handler',
  templateUrl: './overlay-handler.component.html',
  styleUrls: ['./overlay-handler.component.css']
})
export class OverlayHandlerComponent implements OnInit {

  public isMobile: boolean;

  constructor(
    private initOverlay: OverlayIntroService,
    private responsiveService: responsiveService,
    ) { }

  ngOnInit() {
    this.onResize();
    this.responsiveService.checkWidth();

    let overlayRef: OverlayRefRemote = this.initOverlay.open();
    this.setovlRef(overlayRef);
    
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
