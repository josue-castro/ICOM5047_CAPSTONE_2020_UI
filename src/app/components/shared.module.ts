import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialDesignModule } from '../material-design/material-design.module';

import { ViewValuePipe } from '../pipes/view-value.pipe';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [ViewValuePipe, LoginComponent],
  imports: [CommonModule, FormsModule, MaterialDesignModule],
  exports: [ViewValuePipe],
})
export class SharedModule {}
