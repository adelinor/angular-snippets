import { Component } from '@angular/core';

import { FactorialService } from './factorial.service';

@Component({
  selector: 'app-factorial',
  templateUrl: './factorial.component.html',
  styleUrls: ['./factorial.component.css']
})
export class FactorialComponent {

  n: number = null;
  reactive: boolean = false;

  factorialResult: number;
  isFinal = false;

  constructor(private factorialService: FactorialService) {}

  computeFactorial(): void {
    console.log('Reactive ' + this.reactive);
    if (this.reactive) {
      this.computeFactorialReactive();
    } else {
      this.computeFactorialBlocking();      
    }
  }

  updateInput(event): void {
    console.log('Upd=' + event.target.value);
    this.n = event.target.value;
    this.factorialResult = null;
    this.isFinal = false;
  }

  toggleMethod(): void {
    this.reactive = ! this.reactive;
    this.factorialResult = null;
    this.isFinal = false;
  }

  private computeFactorialBlocking(): void {
    this.factorialService.factorial(this.n).subscribe(
      r => {
        this.factorialResult = r;
      },
      err => console.error(err),
      () => this.isFinal = true
    );
  }
  private computeFactorialReactive(): void {
    this.factorialService.reactiveFactorial(this.n).subscribe(
      r => {
        this.factorialResult = r;
      },
      err => console.error(err),
      () => this.isFinal = true
    );
  }

}
