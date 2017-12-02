import { TestBed, inject } from '@angular/core/testing';
import { FactorialService } from './factorial.service';

describe('FactorialService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FactorialService]
    });
  });

  it('should be created', inject([FactorialService], (service: FactorialService) => {
    expect(service).toBeTruthy();
  }));

  function testFactorial(n: number, expected: number): void {
    it(`computes factorial ${n} in a blocking manner`, inject([FactorialService], (service: FactorialService) => {
      service.factorial(n).subscribe(
        (result: number) => { expect(result).toBe(expected); }
      );
    }));
  }

  testFactorial(0,1);
  testFactorial(1,1);
  testFactorial(2,2);
  testFactorial(3,6);
  testFactorial(10,3628800);

  function testReactiveFactorial(n: number, expectedResult: number): void {
    let result = null;
    let emitCount = 0;
    it(`computes and emits in-progress results for factorial ${n}`, inject([FactorialService], (service: FactorialService) => {
      service.reactiveFactorial(n).subscribe(
        (r: number) => { result = r; emitCount++; },
        (err) => { throw Error(err); },
        () => {
          // Iteration completed
          expect(result).toBe(expectedResult);

          // Verify correct number of intermediary invokations
          expect(emitCount).toBe(n + 1);
        }
      );
    }));
  }
  testReactiveFactorial(0,1);
  testReactiveFactorial(1,1);
  testReactiveFactorial(2,2);
  testReactiveFactorial(3,6);
  testReactiveFactorial(10,3628800);
  
});