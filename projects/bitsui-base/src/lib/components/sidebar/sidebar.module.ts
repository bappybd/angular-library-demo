import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuseSidebarComponent } from './sidebar.component';

@NgModule({
  imports: [CommonModule],
  declarations: [FuseSidebarComponent],
  exports: [FuseSidebarComponent],
})
export class FuseSidebarModule {}
