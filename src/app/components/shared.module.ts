import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialDesignModule } from '../material-design/material-design.module';

import { SearchBarComponent } from './search-bar/search-bar.component';
import { ViewValuePipe } from '../pipes/view-value.pipe';

@NgModule({
  declarations: [SearchBarComponent, ViewValuePipe],
  imports: [CommonModule, FormsModule, MaterialDesignModule],
  exports: [SearchBarComponent],
})
export class SharedModule {}
