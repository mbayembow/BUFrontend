import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ecrire } from './ecrire';

describe('Ecrire', () => {
  let component: Ecrire;
  let fixture: ComponentFixture<Ecrire>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ecrire]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ecrire);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
