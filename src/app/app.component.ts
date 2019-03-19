import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `

    <!--
          - <app-header> An dieser Stelle wird der Inhalt des Headers (Components) angezeigt
          - <app-chat> Inhalt des Bodys; Chat-Applikation
          - <app-footer> Inhalt des Footers (Components)
    -->
    
    <app-header></app-header>
    <app-chat></app-chat>
    <app-footer></app-footer>
  
    
  `,
  styles: []
})
export class AppComponent {
  title = 'EasyChat';
}
