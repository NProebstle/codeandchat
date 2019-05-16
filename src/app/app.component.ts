import { Component } from '@angular/core';
import { OverlayService } from './components/overlay/overlay.service';

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
        height: 80%;
        width: 100%;
      }
      .base-footer {
        height: 5%;
        width: 100%;
      }
    </style>

    <!--
          - <app-header> An dieser Stelle wird der Inhalt des Headers (Components) angezeigt
          - <app-chat> Inhalt des Bodys; Chat-Applikation
          - <app-footer> Inhalt des Footers (Components)
    -->
    <div class="base-container">
      <div class="base-header"><app-header></app-header></div>
      <div class="base-body"><app-chat></app-chat></div>
      <div class="base-footer"><app-footer></app-footer></div>
    <div>
    
  `,
  styles: []
})
export class AppComponent {
  title = 'EasyChat';

  // @HostListener('document:keypress', ['$event'])
  // handleKeyboardEvent(event: KeyboardEvent) { 
  //   var key = event.key;
  //   //console.log(key);
  //   if(key == "Enter"){
  //     this.eventKeyEnter();
  //   }
  // }

  // eventKeyEnter(){
  //   var container = document.getElementById('profileContainer');
  //   var hidden = container.hidden;
  //   if(!hidden){
  //     var x = new ChatProfileComponent();
  //     x.confirm();
  //   } else {
  //     var y = new ChatBarComponent();
  //     y.send();
  //   }
  // }

}
