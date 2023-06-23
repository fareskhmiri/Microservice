 
import { NgModule } from '@angular/core';

import { RequestInterceptorService } from './request-interceptor/request-interceptor.service';
// palmyra-needle-angular-import-feature-policy: Do not delete this line

@NgModule({
  providers: [
    RequestInterceptorService,
    // palmyra-needle-angular-provide-feature-policy: Do not delete this line

  ],
})
export class CoreServicesModule { }
