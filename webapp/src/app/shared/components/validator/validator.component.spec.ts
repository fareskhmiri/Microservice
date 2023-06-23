import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageModule } from 'primeng/message';

import { ValidatorComponent } from './validator.component';
import { TranslateModule, TranslateLoader, TranslateStore } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

describe('ValidatorComponent', () => {
  let component: ValidatorComponent;
  let fixture: ComponentFixture<ValidatorComponent>;
  function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/locale/', '.json');
  }
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ValidatorComponent],
        imports: [
          MessageModule,
          HttpClientModule,
          TranslateModule.forChild({
            loader: {
              provide: TranslateLoader,
              useFactory: createTranslateLoader,
              deps: [HttpClient],
            },
          }),
        ],
        providers: [TranslateStore],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
