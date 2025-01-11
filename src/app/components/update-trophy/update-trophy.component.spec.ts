import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTrophyComponent } from './update-trophy.component';

describe('UpdateTrophyComponent', () => {
  let component: UpdateTrophyComponent;
  let fixture: ComponentFixture<UpdateTrophyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateTrophyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateTrophyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
