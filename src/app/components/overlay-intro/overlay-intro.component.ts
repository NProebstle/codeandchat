import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { OverlayService } from '../overlay/overlay.service';
import { OverlayIntroService } from './overlay-intro.service';
import { OverlayRefRemote } from '../../overlayRefRemote';
import { OverlayRefM } from '../shared/models/overlayRefM';

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
    OverlayRefM.overlayRef.close();
    let overlayRef: OverlayRefRemote = this.profileOverlay.open();
    this.setovlRef(overlayRef);
  }

  setovlRef(ref){
    OverlayRefM.overlayRef = ref;
  }

}
