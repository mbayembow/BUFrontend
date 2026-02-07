import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Personne } from './personne';

describe('Personne', () => {
  let component: Personne;
  let fixture: ComponentFixture<Personne>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Personne]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Personne);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
