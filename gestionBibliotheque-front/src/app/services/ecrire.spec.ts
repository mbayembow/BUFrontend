import { TestBed } from '@angular/core/testing';

import { Ecrire } from './ecrire';

describe('Ecrire', () => {
  let service: Ecrire;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ecrire);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
