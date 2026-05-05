import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Navegation } from './navegation';

describe('Navegation', () => {
  let component: Navegation;
  let fixture: ComponentFixture<Navegation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navegation],
    }).compileComponents();

    fixture = TestBed.createComponent(Navegation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
