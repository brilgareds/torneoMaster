import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentScoreComponent } from './tournament-score.component';

describe('TournamentScoreComponent', () => {
  let component: TournamentScoreComponent;
  let fixture: ComponentFixture<TournamentScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TournamentScoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
