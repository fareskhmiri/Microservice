import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderScreenComponent } from './header-screen.component';

describe('HeaderScreenComponent', () => {
  let component: HeaderScreenComponent;
  let fixture: ComponentFixture<HeaderScreenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderScreenComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
