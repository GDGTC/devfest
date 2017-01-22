 import { Component, Input } from '@angular/core';

 @Component({
     selector: 'speaker-container',
     template: `
      <div class="speaker-card" *ngIf="speaker">
        <div>
            <div class="speaker-card-img" [style.background-image]="'url('+speaker.imageUrl+')'" style="background-size: cover; width: 70px; height: 70px;"></div>
        </div>
        <div class="speaker-content">
            <h2><a [routerLink]="['/speakers',speaker.$key,speaker.name]">{{speaker.name}}</a></h2>
            <div>{{speaker.company}}</div>
            <div [hidden]="!speaker.twitter"><a href="https://twitter.com/{{speaker.twitter}}" target="_new">@{{speaker.twitter}}</a></div>
        </div>
    </div>
     
     `
 })
 export class SpeakerContainerComponent {
     @Input() speaker;

 }