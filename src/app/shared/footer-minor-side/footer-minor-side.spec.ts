import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterMinorPage } from './footer-minor-side';

describe('Footer', () => {
  let component: FooterMinorPage;
  let fixture: ComponentFixture<FooterMinorPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterMinorPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterMinorPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
