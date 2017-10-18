import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MATERIAL_COMPATIBILITY_MODE } from '@angular/material';

import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot([
            { path: '', pathMatch: 'full', loadChildren: './home/home.module#HomeModule' },
            { path: '2017', pathMatch: 'full', loadChildren: './home/home.module#HomeModule' },
            { path: 'admin', loadChildren: './admin/admin.module#AdminModule', data: { title: 'Admin' } },
            { path: '', loadChildren: './main/main.module#MainModule' },
        ]),
        ServiceWorkerModule.register('./ngsw-worker.js'),
    ],
    bootstrap: [AppComponent],
    providers: [
        {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true},
    ]
})
export class AppModule { }
