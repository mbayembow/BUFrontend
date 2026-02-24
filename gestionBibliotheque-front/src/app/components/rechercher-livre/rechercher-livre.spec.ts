import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercherLivre } from './rechercher-livre';

describe('RechercherLivre', () => {
  let component: RechercherLivre;
  let fixture: ComponentFixture<RechercherLivre>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RechercherLivre]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RechercherLivre);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
