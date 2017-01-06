import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';

import { AngularFireModule, AuthMethods, AuthProviders } from 'angularfire2';



import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { TicketsComponent } from './tickets.component';
import { SponsorsComponent } from './sponsors.component';
import { SpeakersComponent } from './speakers.component';
import { ScheduleComponent } from './schedule.component';
import { PastComponent } from './past.component';

//import { FireJoinPipe } from './shared/fire-join.pipe';
import { CustomPipesModule } from './shared/custom-pipes.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TicketsComponent,
    SponsorsComponent,
    SpeakersComponent,
    ScheduleComponent,
    PastComponent,
  //  FireJoinPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CustomPipesModule,
    AngularFireModule.initializeApp({
        apiKey: "AIzaSyBrWJx91j512T3q6AaTGNxu_3fq47bYhfg",
        authDomain: "devfestmn.firebaseapp.com",
        databaseURL: "https://devfestmn.firebaseio.com",
        storageBucket: "firebase-devfestmn.appspot.com",
    }, {method: AuthMethods.Popup, provider: AuthProviders.Google}),
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'tickets', component: TicketsComponent},
      {path: 'sponsors', component: SponsorsComponent},
      {path: 'past', component: PastComponent},
      {path: 'speakers', component: SpeakersComponent},
      {path: 'schedule', component: ScheduleComponent},
      {path: 'admin', loadChildren: './admin/admin.module#AdminModule'}
    ]),
    MaterialModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
