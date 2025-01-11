import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedGalleryComponent } from './animated-gallery.component';

describe('AnimatedGalleryComponent', () => {
  let component: AnimatedGalleryComponent;
  let fixture: ComponentFixture<AnimatedGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimatedGalleryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimatedGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
