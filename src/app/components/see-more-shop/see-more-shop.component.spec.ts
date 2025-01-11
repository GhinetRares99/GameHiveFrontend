import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeMoreShopComponent } from './see-more-shop.component';

describe('SeeMoreShopComponent', () => {
  let component: SeeMoreShopComponent;
  let fixture: ComponentFixture<SeeMoreShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeeMoreShopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeeMoreShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
