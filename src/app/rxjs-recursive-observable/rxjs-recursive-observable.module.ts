import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FactorialService } from './factorial/factorial.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [ FactorialService ],
  declarations: []
})
export class RxjsRecursiveObservableModule { }
