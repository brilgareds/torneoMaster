import { Injectable } from '@angular/core';
import { Team } from 'src/app/user/team';
import Swal from 'sweetalert2';
import { GamesRules } from '../interfaces/rules.interface';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faBaby } from '@fortawesome/free-solid-svg-icons';
import { Sugerencia } from '../interfaces/sugerencia.interface';
import { debounce, debounceTime, Subject } from 'rxjs';
import { Tournament } from '../interfaces/tournament.interface';
import { configTournament } from '../interfaces/configTournament.interface';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  private _configTournamentDefault: configTournament = { table: 0, game: 0, id: 'YF7' };
  private _teams: Team[][] = [];
  private _currentGame: number = 12;
  private _currentTable: number = 374;
  private _currentTournament: string = '5YC';
  private _gamesRules: GamesRules = {
    maxPossitivePoints: 150,
    minPossitivePoints: 0,
    roundsAllow: 17
  };

  tournamentInput: Subject<string> = new Subject();
  sugerencias: Sugerencia[] = [];
  alphabet: string[] = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  tournaments: Tournament[] = [
    {
      id: '5YC',
      title: 'Apertura 2022'
    },
    {
      id: '2RQ',
      title: 'Navidad 2021'
    },
    {
      id: '3TZ',
      title: 'Segundo regional de domino del estado Aragua 2022'
    }
  ]

  formGame: FormControl = this.fb.control(
    12,
    [
      Validators.min(1),
      Validators.max(this.gamesRules.roundsAllow)
    ]
  );

  formTournament: FormControl = this.fb.control(
    'RGZ7',
    [
      Validators.required,
      Validators.maxLength(3)
    ]
  );

  constructor(private fb: FormBuilder) {
    this.tournamentInput
      .pipe(
        debounceTime(2000)
      )
      .subscribe((value: string) => {
        this.sugerencias = this.tournaments.filter(({id, title}: Tournament) => (`${id} ${title.toLowerCase()}`).includes(value))

        console.log('Sugerencias: ', this.sugerencias);
      });
  }

  searchTournament() {
    return
  }

  inputTournamentChanged(event: any) {
    console.log('Event: ', event.value);
    this.tournamentInput.next(event.value);
  }

  validConfigTournament() {
    let response = false;

    try {
      const objectConfig = JSON.parse(localStorage?.getItem('configTournament') || '');
      const props = Object.keys(this._configTournamentDefault);

      const validProps = props.filter((prop: string) => objectConfig[prop] !== undefined);

      response = (props.length === validProps.length);

    } catch(e) {}

    return response;
  }

  get tournamentConfig(): configTournament {

    const configValid = this.validConfigTournament();

    const response = (configValid) ?
      JSON.parse(localStorage.getItem('configTournament')!) :
      { ...this._configTournamentDefault };

    return response;
  }


  setCurrentTable(table: number) {
    localStorage.setItem('configTournament', JSON.stringify({ ...this.tournamentConfig, table }));
  }

  setCurrentGame(game: number) {
    localStorage.setItem('configTournament', JSON.stringify({ ...this.tournamentConfig, game }));
  }

  get currentTable(): number {
    return this.tournamentConfig.table;
  }

  get currentGame(): number {
    return this.tournamentConfig.game;
  }

  get currentTournament(): string {
    return this.tournamentConfig.id;
  }

  get teams(): Team[][] {
    return [...this._teams];
  }

  get gamesRules(): GamesRules {
    return { ...this._gamesRules };
  }

  modalChangeGame() {

    Swal.fire({
      title: 'Ronda',
      input: 'number',
      confirmButtonText: 'Guardar',
      inputValidator: value => {
        const response =
          (!value) ? 'Valor requerido!' :
          null;

        return response;
      },
      preConfirm: (game) => this.setCurrentGame(parseFloat(game))
    });
  }

  modalChangeTable() {

    Swal.fire({
      title: 'Mesa',
      input: 'number',
      confirmButtonText: 'Guardar',
      inputValidator: value => {
        const response =
          (!value) ? 'Valor requerido!' :
          null;

        return response;
      },
      preConfirm: (table) => this.setCurrentTable(parseFloat(table)),
    })
  }

  get tournamentIsValid() {
    return this.formTournament.valid;
  }

  async modalChangeTournament() {

    let valid = false;

    const a = Swal.fire({
      title: 'Torneo',
      confirmButtonText: 'Guardar',
      didOpen: () => {
        const input = <HTMLInputElement>document.querySelector('#input-tournament');

        input.addEventListener('keyup', () => {
          console.log('En keyup!');

          this.tournamentInput.next(input.value);
        });
      },
      html:  `
        <div class="container" style="padding-left: 3rem; padding-right: 3rem;">
          <input id="input-tournament" class="form-control">

          ${ (this.tournamentIsValid) ? `
            <ul class="list-group" id='listado-sugerencias'>
            </ul>
          `
          : '' }

        </div>
      `,
      inputLabel: 'Guardar',
      inputValidator: value => {

        const response =
          (!value) ? 'Valor requerido!' :
          null;

        return response;
      },
      preConfirm: () => {
        const value = (<HTMLInputElement>document.querySelector('#input-tournament'))?.value;
        this._currentTournament = value;
      },
    })

    a.then(()=>{})

  }

  setTeams(value: Team[][]) {
    this._teams = value;
  }

  setGame(value: number) {
    this._currentGame = value;
  }

  saveScore() {

    return Swal.fire(
      'Registrado correctamente!',
      'Click para continuar',
      'success'
    );
  }

}
