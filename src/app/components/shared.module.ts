import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialDesignModule } from '../material-design/material-design.module';

import { ViewValuePipe } from '../pipes/view-value.pipe';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [ViewValuePipe, LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialDesignModule,
    ReactiveFormsModule,
  ],
  exports: [ViewValuePipe, LoginComponent],
})
export class SharedModule {}
