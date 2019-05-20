import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayProfileComponent } from './overlay-profile.component';

describe('OverlayProfileComponent', () => {
  let component: OverlayProfileComponent;
  let fixture: ComponentFixture<OverlayProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverlayProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverlayProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
