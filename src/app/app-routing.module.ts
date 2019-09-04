import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AuthGuard } from './auth/auth.guard';
import { ArticleMainComponent } from './articles/article-main/article-main.component';

const routes: Routes = [
  { path: '', component: ArticleMainComponent },
  //{ path: 'create', component: PostCreateComponent, canActivate: [AuthGuard] },
  //{ path: 'edit/:postId', component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
