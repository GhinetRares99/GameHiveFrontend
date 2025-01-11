import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterSignUpComponent } from './after-sign-up.component';

describe('AfterSignUpComponent', () => {
  let component: AfterSignUpComponent;
  let fixture: ComponentFixture<AfterSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AfterSignUpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfterSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
