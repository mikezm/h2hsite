import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AuthGuard } from './auth/auth.guard';
import { SummaryComponent } from './article/summary/summary.component';

const routes: Routes = [
  { path: '', component: SummaryComponent },
  //{ path: 'create', component: PostCreateComponent, canActivate: [AuthGuard] },
  //{ path: 'edit/:postId', component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
