import { Component, OnInit } from '@angular/core';
import { OverlayIntroService } from '../overlay-intro/overlay-intro.service';
import { OverlayService } from '../overlay/overlay.service';
import { OverlayRefRemote } from '../../overlayRefRemote';
import { OverlayRefM } from '../shared/models/overlayRefM';

@Component({
  selector: 'app-overlay-handler',
  templateUrl: './overlay-handler.component.html',
  styleUrls: ['./overlay-handler.component.css']
})
export class OverlayHandlerComponent implements OnInit {

  constructor(
    private initOverlay: OverlayIntroService
    ) { }

  ngOnInit() {
    let overlayRef: OverlayRefRemote = this.initOverlay.open();
    this.setovlRef(overlayRef);
  }

  setovlRef(ref){
    OverlayRefM.overlayRef = ref;
  }
}
