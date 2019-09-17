import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AngularMaterialModule } from '../angular-material.module';

import { SummaryComponent } from './summary/summary.component';
@NgModule({
  declarations: [
    SummaryComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule
  ]
})
export class ArticlesModule {}