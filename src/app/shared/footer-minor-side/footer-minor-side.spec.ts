import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterMinorSide } from './footer-minor-side';

describe('Footer', () => {
  let component: FooterMinorSide;
  let fixture: ComponentFixture<FooterMinorSide>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterMinorSide]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterMinorSide);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
