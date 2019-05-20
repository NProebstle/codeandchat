import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActiveUsers } from '../shared/models/activeUsers';
import { Visibility } from '../shared/models/visibility';
import { Profile } from '../shared/models/profile';

@Component({
  selector: 'app-online-view',
  templateUrl: './online-view.component.html',
  styleUrls: ['./online-view.component.css']
})
export class OnlineViewComponent implements OnInit {

  public onlineUserArray: any[];
  public containerNumber: number;
  public first: boolean;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    console.log('[INIT] Component: online-view!');
    this.first = true;
    this.updateData();
  }

  updateData(){
    setInterval(() => {
      if(Visibility.showOnline){
      this.disposeView();
      this.buildView();
      }}, 500);
  }

  disposeView(){
    if(!this.first){
        document.getElementById('onlineProfilesContainer').innerHTML = '';
    }
    return;
  }

  get activeUsers(){
    return ActiveUsers.activeUsers;
  }

  buildView(){
    var buildcache = this.activeUsers;
    this.containerNumber = buildcache.length;
    if(buildcache.length > 1){
      for(var i = 0; i < buildcache.length; i++){
        if(buildcache[i][0] == Profile.UID){
          nick = buildcache[i][1] + ' [Du]';
        } else {
          var nick = buildcache[i][1];
        }
        var color = buildcache[i][3];
        var background = 'white';
        var divcolor = color;
        var textcolor = color;
        if(color == 'white'){
          textcolor = 'black';
          var background = 'white';
          color = 'black';
          var divColor = 'black';
        } else if(color == 'black'){
          textcolor = 'white';
          var background = 'black';
          var divColor = 'white';
        }
        var container = document.createElement('div');
        container.id = 'online-container' + i;
        container.style.cssText = `background-color: ${background};border: 1px solid ${color};border-radius: 5px;color: ${textcolor};clear: both;float: left;font-family: system-ui;font-size: 18px;line-height: 0px;margin: 1px 0;margin-right: 5px;max-width: 80%;min-width: 150px;padding: 10px;padding-bottom: 0px;padding-top: 0px;position: relative;text-align: left`;
      
        var div = document.createElement('div');
        div.style.cssText = 'position:relative;height:100%;';
        container.appendChild(div);
        
        var nickSpan = document.createElement('span');
        div.appendChild(nickSpan);

        var profilePicture = document.createElement('img');
        profilePicture.src = './assets/profile.png';
        profilePicture.style.cssText = `height: 25px;width: 25px;border: solid 1px;border-radius: 50%;float: left;margin-top: -12px;border-color: ${color}`;
        nickSpan.appendChild(profilePicture);

        var header = document.createElement('h4');
        header.innerText = `${nick}`;
        header.style.cssText = 'position: relative;margin-left: 35px;'
        nickSpan.appendChild(header);

        document.getElementById('onlineProfilesContainer').appendChild(container);
      }
    } else if (buildcache.length == 1){
      if(buildcache[0][0] == Profile.UID){
        nick = buildcache[0][1] + ' [Du]';
      } else {
        var nick = buildcache[0][1];
      }
      var color = buildcache[0][3];
      var background = 'white';
      var divcolor = color;
      var textcolor = color;
      if(color == 'white'){
        textcolor = 'black';
        var background = 'white';
        color = 'black';
        var divColor = 'black';
      } else if(color == 'black'){
        textcolor = 'white';
        var background = 'black';
        var divColor = 'white';
      }
      var container = document.createElement('div');
      container.id = 'online-container' + 1
      container.style.cssText = `background-color: ${background};border: 1px solid ${color};border-radius: 5px;color: ${textcolor};clear: both;float: left;font-family: system-ui;font-size: 18px;line-height: 5px;margin: 5px 0;margin-right: 5px;max-width: 80%;min-width: 150px;padding: 10px;padding-bottom: 5px;padding-top: 0px;position: relative;text-align: left`;
    
      var div = document.createElement('div');
      div.style.cssText = 'position:relative;height:100%;';
      container.appendChild(div);
      
      var nickSpan = document.createElement('span');
      div.appendChild(nickSpan);

      var profilePicture = document.createElement('img');
      profilePicture.src = './assets/profile.png';
      profilePicture.style.cssText = `height: 25px;width: 25px;border: solid 1px;border-radius: 50%;float: left;margin-top: -12px;border-color: ${color}`;
      nickSpan.appendChild(profilePicture);

      var header = document.createElement('h4');
      header.innerText = `${nick}`;
      header.style.cssText = 'position: relative;margin-left: 35px;'
      nickSpan.appendChild(header);

      document.getElementById('onlineProfilesContainer').appendChild(container);

      if(buildcache[0][0] == Profile.UID){
        var text = document.createElement('div');
        text.innerText = 'Du bist der einzige Chat-Teilnehmer 😕';
        text.style.cssText = 'text-align: center;color:#00802F;width:85%;'
        document.getElementById('onlineProfilesContainer').appendChild(text);
      }

    } else {
      var text = document.createElement('div');
      text.innerText = 'Du bist der einzige Chat-Teilnehmer 😕';
      text.style.cssText = 'text-align: center;color:#00802F;width:85%;'
      document.getElementById('onlineProfilesContainer').appendChild(text);
      return;
    }
    this.first = false;
    return;
  }
}
