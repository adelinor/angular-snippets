import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FactorialService } from './factorial/factorial.service';
import { FactorialComponent } from './factorial/factorial.component';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [ FactorialService ],
  declarations: [FactorialComponent]
})
export class RxjsRecursiveObservableModule { }
