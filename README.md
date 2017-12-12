## Angular Snippets

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.5 .

Every snippet is articulated around:
* *the context*: a brief description of the problem statement
* *concepts*: key points with code illustrations
* *demo*: link to demo of concepts
* *further*: if applicable, what would deserve more analysis

All snippets can be tried on the [demo installation](https://adelinor.github.io/angular-snippets)

## RxJs Recursive Observable

#### Context
You need to retrieve data with a paging API where the number of pages
required all data is not known in advance. You know that you finished
when:
* number of data items retrieved is *strictly smaller* than the page size
* or when you get an empty result set

#### Concepts
The problem above can be well expressed with a recursion: *Fetch data for page until returned size matches page size*.

From Promises in AngularJS, the HttpClient in Angular returns an `Observable`.

I struggled for a couple of days to express with Observables the following transformation to apply on the result of a single page:
* call another page if number of items equals page size
* conclude otherwise

This lead me to create this snippet. As I could not find an open paging API, I using the classic factorial calculation: FactorialService class (TODO: include link) exposes a method:

```ts
factorial(n: number): Observable<number>
```

This service uses a `PageContext` to include the fetched results and the current position:

```ts
class PageContext {
  startAt = 0;
  result = 1;

  constructor(private readonly n: number) { }

  get completed(): boolean {
    return this.startAt >= this.n;
  }
}
```


Iterating through the pages is done by starting on the first page: position zero and moving up until completion. (Unlike for the real paging API, the completed condition can be defined in advance.)


Also, taking advantage of the *reactive* paradigm, it makes sense to process fetched page results while other pages are getting read.


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


[![Build Status][travis-badge]][travis-badge-url]

[travis-badge]: https://travis-ci.org/adelinor/angular-snippets.svg?branch=master
[travis-badge-url]: https://travis-ci.org/adelinor/angular-snippets