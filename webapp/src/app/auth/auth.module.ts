import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from '@auth/login/login.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './store/reducers/auth.reducers';
import { AuthEffects } from './store/effects/auth.effects';
import { LoadersModule } from '@core/components/loaders/loaders.module';
import { CoreModule } from '@app/core/core.module';
@NgModule({
  imports: [
    ReactiveFormsModule,
    LoadersModule,
    FormsModule,
    CoreModule,
    CommonModule,
    StoreModule.forFeature('Auth', reducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  declarations: [LoginComponent]
})
export class AuthModule {}
