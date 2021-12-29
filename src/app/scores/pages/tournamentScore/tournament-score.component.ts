import { Component, OnInit } from '@angular/core';
import { scorePlayers } from '../../interfaces/scorePlayers.interface';

@Component({
  selector: 'app-tournament-score',
  templateUrl: './tournament-score.component.html',
  styleUrls: ['./tournament-score.component.css']
})
export class TournamentScoreComponent implements OnInit {

  scorePlayers: scorePlayers[] = [
    {
      position: 1,
      urlPicture: '',
      name: 'Pedro',
      lastname: 'Perez',
      winGames: 5,
      efective: 541,
      didPoints: 158,
      lostPoints: 76,
      totalPoints: 3213
    },
    {
      position: 2,
      urlPicture: '',
      name: 'Jean',
      lastname: 'Gonzalez',
      winGames: 4,
      efective: 641,
      didPoints: 258,
      lostPoints: 96,
      totalPoints: 2513
    },
    {
      position: 3,
      urlPicture: '',
      name: 'Marco',
      lastname: 'Parra',
      winGames: 4,
      efective: 381,
      didPoints: 258,
      lostPoints: 36,
      totalPoints: 2160
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
