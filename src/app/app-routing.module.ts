import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FactorialComponent } from './rxjs-recursive-observable/factorial/factorial.component';
import { BlobSaveComponent } from './blob-save/blob-save/blob-save.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'rxjs-recursive-observable/factorial', component: FactorialComponent },
  { path: 'blob-save', component: BlobSaveComponent },
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
