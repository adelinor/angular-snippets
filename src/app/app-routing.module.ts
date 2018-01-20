import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FactorialComponent } from './rxjs-recursive-observable/factorial/factorial.component';
import { BlobSaveComponent } from './blob-save/blob-save.component';
import { HomeComponent } from './home/home.component';
import { RxjsEventStreamComponent } from './rxjs-event-stream/rxjs-event-stream.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'rxjs-recursive-observable/factorial', component: FactorialComponent },
  { path: 'blob-save', component: BlobSaveComponent },
  { path: 'rxjs-event-stream', component: RxjsEventStreamComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
