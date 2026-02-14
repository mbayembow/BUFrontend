import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllEmprunt } from './all-emprunt';

describe('AllEmprunt', () => {
  let component: AllEmprunt;
  let fixture: ComponentFixture<AllEmprunt>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllEmprunt]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllEmprunt);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
