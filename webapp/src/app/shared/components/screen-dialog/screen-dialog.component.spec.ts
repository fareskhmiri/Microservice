import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogModule } from 'primeng/dialog';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ScreenDialogComponent } from './screen-dialog.component';
import { FeatureService } from '@app/core/services/feature/feature.service';

describe('ScreenDialogComponent', () => {
  let component: ScreenDialogComponent;
  let fixture: ComponentFixture<ScreenDialogComponent>;
  const mockFeatureService = jasmine.createSpyObj('FeatureService', ['setFocus']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenDialogComponent ],
      imports: [DialogModule, RouterTestingModule, BrowserAnimationsModule],
      providers: [{provide: Location, useValue: {}}, {provide: FeatureService, useValue: mockFeatureService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
