import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemovePossessionPopupComponent } from './remove-possession-popup.component';

describe('RemovePossessionPopupComponent', () => {
  let component: RemovePossessionPopupComponent;
  let fixture: ComponentFixture<RemovePossessionPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemovePossessionPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemovePossessionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
