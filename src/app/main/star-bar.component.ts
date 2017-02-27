import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({ 
    selector: 'star-bar',
    template: `
    <span *ngFor="let val of options" (click)="select(val)">
        <ng-template [ngIf]="val <= selected">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="#000000" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
            </svg>
        </ng-template>
        <ng-template [ngIf]="!selected || val > selected">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="#000000" d="M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z" />
            </svg>
        </ng-template>

    </span>
    
`,
})
export class StarBarComponent {
    @Input() selected = 0;
    @Output() newSelection = new EventEmitter<number>();

    options = [1,2,3,4,5];

    constructor() {

    }

    select(option: number) {
        if(this.selected == option) {
            option = 0;
        }
        this.selected = option;
        this.newSelection.emit(option);
    }



}