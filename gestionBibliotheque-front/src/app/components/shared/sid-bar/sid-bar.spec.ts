import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidBar } from './sid-bar';

describe('SidBar', () => {
  let component: SidBar;
  let fixture: ComponentFixture<SidBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidBar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
