import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


//import { AuthGuard } from './auth/auth.guard';
import { ArticleSummaryComponent } from './article/summary/summary.component';
import { ArticleDetailComponent } from './article/detail/detail.component';


const routes: Routes = [
  // { path: 'article', loadChildren: './article/article.module#ArticleModule' },
  //{ path: 'create', component: PostCreateComponent, canActivate: [AuthGuard] },
  //{ path: 'edit/:postId', component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: 'articles', component: ArticleSummaryComponent },
  { path: 'article/:headline', component: ArticleDetailComponent },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
