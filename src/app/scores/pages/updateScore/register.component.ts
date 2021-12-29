import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { debounceTime, Subject } from 'rxjs';
import { Team } from '../../../user/team';
import { TournamentService } from '../../../tournaments/services/tournament.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  debouncer: Subject<string> = new Subject();

  showNegativePoints: boolean = false;

  scoreForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private tournamentService: TournamentService) { }

  ngOnInit(): void {
    this.debouncerSubscription();

    this.tournamentService.setTeams([
      [{ name: 'Pedro Perez'    }, { name: 'Pablo Hernandez' }],
      [{ name: 'Luis Fernandez' }, { name: 'Jhon Estradas'   }]
    ]);

    this.scoreForm = this.fb.group(this.makeScoreFormValidations);

    this.teams.forEach((team:Team[], i:number) => {
      this.scoreForm.get(`positivePoint_${i+1}`)?.valueChanges
        .subscribe((current) => {

          if (/D/dm.test(current)) {
            const newValue = parseFloat(current.toString().replace(/D/dm, ''));

            console.log('newValiue is: ', newValue);
            this.scoreForm.get(`positivePoint_${i+1}`)?.setValue(newValue);
          }

        })
    });
  }

  verifyValues(a: any, b: any) {
    console.log('Es: ', a, b);
  }

  get teams(): Team[][] {
    return this.tournamentService.teams;
  }

  get gamesRules() {
    return this.tournamentService.gamesRules;
  }

  get alphabet() {
    return this.tournamentService.alphabet;
  }

  get countTeams(): number {
    return this.teams.length;
  }

  get invalidPossitivePoints(): Team[][] {
    return this.teams.filter((_:any, i:number) => this.scoreForm.get(`positivePoint_${i+1}`)?.invalid);
  }

  get validPositivePoints(): Team[][] {
    return this.teams.filter((_:any, i:number) => this.scoreForm.get(`positivePoint_${i+1}`)?.valid);
  }

  get makeScoreFormValidations(): FormGroup {

    let newForm: any;

    this.teams.forEach((a:Team[], i:number) => {

      const positivePoint = `positivePoint_${i+1}`;
      const negativePoint = `negativePoint_${i+1}`;

      newForm = {
        ...newForm,
        [positivePoint]: [
          '',
          this.validationsInputPoints
        ],
        [negativePoint]: [
          { value: '', disabled: true },
          this.validationsInputPoints
        ]
      };

    });

    return newForm;
  }

  get validationsInputPoints(): any {

    return [
      this.forbiddenNameValidator(/D/),
      Validators.required,
      Validators.min(this.tournamentService.gamesRules.minPossitivePoints),
      Validators.max(this.tournamentService.gamesRules.maxPossitivePoints)
    ];
  }

  forbiddenNameValidator(nameRe: RegExp): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = nameRe.test(control.value);
      return forbidden ? {forbiddenName: {value: control.value}} : null;
    };
  }

  possitivePointsUpdated(ev: any): void {
    this.debouncer.next('');
  }

  positivePointMinlenghtError(i: number) {
    return this.scoreForm.get(`positivePoint_${i+1}`)?.errors?.['min'];
  }

  positivePointMaxlenghtError(i: number) {
    return this.scoreForm.get(`positivePoint_${i+1}`)?.errors?.['max'];
  }

  positivePointRequiredError(i: number) {
    const isRequired = this.scoreForm.get(`positivePoint_${i+1}`)?.errors?.['required'];
    const isTouched  = this.scoreForm.get(`positivePoint_${i+1}`)?.touched;

    return (isRequired && isTouched);
  }

  saveScore () {

    console.log('Submit!!!');

    this.tournamentService.saveScore()
      .then(() => {
        this.scoreForm = this.fb.group(this.makeScoreFormValidations);
      });

  }

  completeNegativePoints() {

    const validPossitivePoints = !(this.invalidPossitivePoints.length);

    if (this.teams.length === 2) {
      const possitivePointTeam1 = (validPossitivePoints) ? this.scoreForm.get(`positivePoint_1`)?.value : 0;
      const possitivePointTeam2 = (validPossitivePoints) ? this.scoreForm.get(`positivePoint_2`)?.value : 0;

      this.scoreForm.get(`negativePoint_1`)?.setValue(possitivePointTeam2);
      this.scoreForm.get(`negativePoint_2` )?.setValue(possitivePointTeam1);
    }

  }

  getAlphabetcFont(position: number) {
    return;
  }

  debouncerSubscription(): void {
    this.debouncer
      .pipe(
        debounceTime(300))
      .subscribe(() => {
        this.completeNegativePoints();
      });

    // this.teams.forEach((team:Team[], i:number) => {
    //   this.scoreForm.get(`positivePoint_${i+1}`)?.valueChanges
    // })
  }

}
