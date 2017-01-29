 import { Component, Input } from '@angular/core';

 @Component({
     selector: 'speaker-container',
     template: `
      <div class="speaker-card" *ngIf="speaker">
        <div>
            <div  class="thumb" [style.background-image]="'url('+speaker.imageUrl+')'"></div>
        </div>
        <div class="speaker-content">
            <div style="font-size:20px;"><a [routerLink]="['/speakers',speaker.$key,speaker.name]">{{speaker.name}}</a></div>
            <div>{{speaker.company}}</div>
            <div *ngIf="speaker.twitter"><a href="https://twitter.com/{{speaker.twitter}}" target="_blank">@{{speaker.twitter}}</a></div>
        </div>
    </div>
     
     `
 })
 export class SpeakerContainerComponent {
     @Input() speaker;

 }