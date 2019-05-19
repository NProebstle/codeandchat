import { Component, OnInit } from '@angular/core';
import { OverlayService } from './components/overlay/overlay.service';
import { responsiveService } from './components/shared/services/responsive.service';

@Component({
  selector: 'app-root',
  template: `

    <style>
      .base-container {
        height: 100%;
        width: 100%;
      }
      .base-header {
        height: 15%;
        width: 100%;
      }
      .base-body {
        height: 82%;
        width: 100%;
      }
      .base-footer {
        height: 3%;
        width: 100%;
        position: absolute;
        bottom: 0;
        background-color: #00802F;
      }
    </style>

    <!--
          - <app-header> An dieser Stelle wird der Inhalt des Headers (Components) angezeigt
          - <app-chat> Inhalt des Bodys; Chat-Applikation
          - <app-footer> Inhalt des Footers (Components)
    -->
    <div class="base-container" (window:resize)="onResize($event)">
      <div class="base-header"><app-header></app-header></div>
      <div class="base-body"><app-chat></app-chat></div>
      <div class="base-footer"><app-footer></app-footer></div>
    <div>
    
  `,
  styles: []
})
export class AppComponent implements OnInit {
  title = 'EasyChat';

  constructor(private responsiveService:responsiveService){

  }

  ngOnInit(){
    this.responsiveService.getMobileStatus().subscribe( isMobile =>{
      if(isMobile){
        console.log('Mobile device detected')
      }
      else{
        console.log('Desktop detected')
      }
    });
    this.onResize();    
  }

  onResize(){
    this.responsiveService.checkWidth();
  }
}
