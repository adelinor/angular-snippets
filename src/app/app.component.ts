import { Component } from '@angular/core';
import { FactorialService } from './rxjs-recursive-observable/factorial/factorial.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  n: number = null;
  reactive: boolean = false;

  private factorialResult: number;

  constructor(private factorialService: FactorialService) {}

  computeFactorial(): void {
    console.log('Reactive ' + this.reactive);
    if (this.reactive) {
      this.computeFactorialReactive();
    } else {
      this.computeFactorialBlocking();      
    }
  }

  private computeFactorialBlocking(): void {
    this.factorialResult = null;
    this.factorialService.factorial(this.n).subscribe(
      r => {
        this.factorialResult = r;
      }
    );
  }
  private computeFactorialReactive(): void {
    this.factorialResult = null;
    this.factorialService.reactiveFactorial(this.n).subscribe(
      r => {
        this.factorialResult = r;
      }
    );
  }

}
