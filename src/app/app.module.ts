import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ChatComponent } from './components/chat/chat.component';
import { ChatHistoryComponent } from './components/chat-history/chat-history.component';
import { ChatBarComponent } from './components/chat-bar/chat-bar.component';
import { ChatProfileComponent } from './components/chat-profile/chat-profile.component';
import { environment } from '../environments/environment';
import { OverlayComponent } from './components/overlay/overlay.component';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ChatComponent,
    ChatHistoryComponent,
    ChatBarComponent,
    ChatProfileComponent,
    OverlayComponent,
    //OverlayModule
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    OverlayComponent,
  ]
})
export class AppModule { }
