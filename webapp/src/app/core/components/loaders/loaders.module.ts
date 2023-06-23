import { NgModule } from '@angular/core';

import { LoaderComponent } from '@core/components/loaders/loader/loader.component';
import { LoaderMaskComponent } from '@core/components/loaders/loader-mask/loader-mask.component';
import { LoaderService } from '@core/components/loaders/services/loader.service';
import { SharedModule } from '@shared/shared.module';
/**
 * Module that exports and provides the Loaders components/services
 */
@NgModule({
    imports: [SharedModule],
    exports: [LoaderComponent, LoaderMaskComponent],
    declarations: [LoaderComponent, LoaderMaskComponent],
    providers: [LoaderService],
})
export class LoadersModule { }
