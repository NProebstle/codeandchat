import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { OverlayService } from '../overlay/overlay.service';
import { OverlayIntroService } from './overlay-intro.service';
import { OverlayRefRemote } from '../../overlayRefRemote';
import { OverlayRefM } from '../shared/models/overlayRefM';
import { OverlayRef, Overlay } from '@angular/cdk/overlay';

@Component({
  selector: 'app-overlay-intro',
  templateUrl: './overlay-intro.component.html',
  styleUrls: ['./overlay-intro.component.css']
})
export class OverlayIntroComponent implements OnInit {

  constructor(private profileOverlay: OverlayService) { }

  ngOnInit() {
  }

  confirm(){
    this.ovlRef.close();
    let ovlRef: OverlayRefRemote = this.profileOverlay.open();
    this.setovlRef(ovlRef);
  }

  setovlRef(ref){
    OverlayRefM.overlayRef = ref;
  }

  get ovlRef() :OverlayRefRemote{
    return OverlayRefM.overlayRef;
  }

}
