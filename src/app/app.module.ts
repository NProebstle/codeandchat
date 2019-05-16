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
import { ApiService } from './api.service';
import { OverlayService } from './components/overlay/overlay.service';
import { OverlayIntroComponent } from './components/overlay-intro/overlay-intro.component';
import { OverlayIntroService } from './components/overlay-intro/overlay-intro.service';
import { OverlayHandlerComponent } from './components/overlay-handler/overlay-handler.component';
import { HttpClientModule } from '@angular/common/http';

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
    OverlayIntroComponent,
    OverlayHandlerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    OverlayModule,
    HttpClientModule,
  ],
  providers: [
    ApiService,
    OverlayService,
    OverlayIntroService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    OverlayComponent,
    OverlayIntroComponent,
  ]
})
export class AppModule { }
