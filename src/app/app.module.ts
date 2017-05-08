import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
     RouterModule.forRoot([
      {
        path: '',
        pathMatch: 'full',
        loadChildren: './home/home.module#HomeModule',
      },
      {
        path: '',
        loadChildren: './main/main.module#MainModule',
      },
      {
        path: 'admin', 
        loadChildren: './admin/admin.module#AdminModule',
        data: {title: 'Admin'},
      }
    ]),

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
