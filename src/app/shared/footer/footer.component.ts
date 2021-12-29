import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../../tournaments/services/tournament.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
// import { SwalPortalDirective } from '@sweetalert2/ngx-sweetalert2';



@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public readonly swalTargets: SwalPortalTargets, private tournamentService: TournamentService) { }

  ngOnInit(): void {
  }

  currentYear() {
    return new Date().getFullYear();
  }

  modalChangeGame() {
    this.tournamentService.modalChangeGame();
  }

  modalChangeTable() {
    this.tournamentService.modalChangeTable();
  }

  test() {
    console.log('TODO BIEN!!!, Event: ');
  }

  modalChangeTournament() {

    Swal.fire({
      template: '#my-template'
    })

    // this.tournamentService.modalChangeTournament();
  }

  get formGame() {
    return this.tournamentService.formGame;
  }

  get currentTable() {
    return this.tournamentService.currentTable;
  }

  get currentGame() {
    return this.tournamentService.currentGame;
  }

  get currentTournament() {
    return this.tournamentService.currentTournament;
  }

}
