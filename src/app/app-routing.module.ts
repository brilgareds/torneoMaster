
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "src/app/home/components/home/home.component";
import { RegisterComponent } from "src/app/scores/pages/updateScore/register.component";
import { TournamentScoreComponent } from "./scores/pages/tournamentScore/tournament-score.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'score',
    component: TournamentScoreComponent
  },
  {
    path: 'registerScore',
    component: RegisterComponent
  },
  {
    path: '**',
    redirectTo: '/'
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})


export class AppRoutingmodule {

}
