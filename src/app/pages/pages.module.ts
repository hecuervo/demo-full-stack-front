import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonpModule } from '@angular/http';
import {
  MatTableModule,
  MatPaginatorModule,
  MatSortModule
} from '@angular/material';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PagesRoutes } from './pages.routing';
import { UserComponent } from './user/user.component';
import { DataBaseComponent } from './data-base/data-base.component';
import { ImagePipe } from '@/pipes/image.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PagesRoutes),
    FormsModule,
    ReactiveFormsModule,
    JsonpModule,
    NgbModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  declarations: [
    UserComponent,
    DataBaseComponent,
    ImagePipe
  ],
  entryComponents: []
})
export class PagesModule {}
