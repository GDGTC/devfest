import { Component } from '@angular/core';

@Component({
    template: `
        <section>
            <div class="callout">Visit past DevFestMN content</div>
            <p>This is the 5th year of DevFestMN.</p>
            <mat-card style="width:400px;margin:16px 0;">
                <mat-card-header><a href="/2018/speakers" style="font-size:24px;">2018 Speakers</a></mat-card-header>
            </mat-card>
            <mat-card style="width:400px;margin:16px 0;">
                <mat-card-header><a href="/2018/schedule" style="font-size:24px;">2018 Schedule</a></mat-card-header>
            </mat-card>
            <mat-card style="width:400px;margin:16px 0;">
                <mat-card-header><a href="/2017/speakers" style="font-size:24px;">2017 Speakers</a></mat-card-header>
            </mat-card>
            <mat-card style="width:400px;margin:16px 0;">
                <mat-card-header><a href="/2017/schedule" style="font-size:24px;">2017 Schedule</a></mat-card-header>
            </mat-card>
            <mat-card style="width:400px;margin:16px 0;">
                <mat-card-header><a href="/a/2016/" style="font-size:24px;">2016 DevFestMN Archive</a></mat-card-header>
            </mat-card>
        </section>
    `,
})
export class PastComponent {
    constructor() { }

}
