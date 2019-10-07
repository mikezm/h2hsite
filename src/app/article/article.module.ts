import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../angular-material.module';

import { ArticleSummaryComponent } from './summary/summary.component';
import { ArticleDetailComponent } from './detail/detail.component';
import { SearchPipe } from './search.pipe';

@NgModule({
  declarations: [
    ArticleSummaryComponent,
    ArticleDetailComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule,
    RouterModule
  ]
})
export class ArticleModule { }