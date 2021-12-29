import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { RegisterComponent } from './scores/pages/updateScore/register.component';
import { ScoresModule } from './scores/scores.module';
import { AppRoutingmodule } from './app-routing.module';
import { HomeComponent } from './home/components/home/home.component';
import { HeaderComponent } from './shared/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './shared/footer/footer.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { TournamentService } from './tournaments/services/tournament.service';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingmodule,
    ReactiveFormsModule,
    ScoresModule,
    SweetAlert2Module
  ],
  providers: [
    TournamentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
