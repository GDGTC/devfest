import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { TicketsComponent } from './tickets.component';
import { SponsorsComponent } from './sponsors.component';
import { PastComponent } from './past.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TicketsComponent,
    SponsorsComponent,
    PastComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'tickets', component: TicketsComponent},
      {path: 'sponsors', component: SponsorsComponent},
      {path: 'past', component: PastComponent},
      {path: 'admin', loadChildren: './admin/admin.module#AdminModule'}
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
