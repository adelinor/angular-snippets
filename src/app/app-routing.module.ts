import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FactorialComponent } from './rxjs-recursive-observable/factorial/factorial.component';

const routes: Routes = [
  { path: '', redirectTo: '/rxjs-recursive-observable/factorial', pathMatch: 'full' },
  { path: 'rxjs-recursive-observable/factorial', component: FactorialComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
