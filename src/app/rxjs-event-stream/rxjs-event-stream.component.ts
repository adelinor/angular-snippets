import { Component, OnInit } from '@angular/core';
import { MovieSearchService } from './movie-search.service';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/timer';

import 'rxjs/add/operator/bufferTime';
import 'rxjs/add/operator/bufferWhen';

@Component({
  selector: 'app-rxjs-event-stream',
  templateUrl: './rxjs-event-stream.component.html',
  styleUrls: ['./rxjs-event-stream.component.css']
})
export class RxjsEventStreamComponent implements OnInit {

  name: string = null;
  private selectedDates: number[] = [];
  private selectedCategories: string[] = [];

  searching = false;
  searchResults: string;

  private eventStream: Subject<string>;
  private previous: number;
  private releaseStream: Subject<boolean> = new Subject();
  private bufferTimer = null;

  constructor(private searchService: MovieSearchService) {
    this.eventStream = new Subject();

    this.previous = Date.now();
    // this.eventStream.bufferTime(3000).subscribe( e => {
    //   const newTimestamp = Date.now();
    //   console.log(`${newTimestamp - this.previous} -${e}`);
    //   this.previous = newTimestamp;
    // })
    this.eventStream.bufferWhen(() => {
      return this.releaseStream;
    }).subscribe( e => {
      const newTimestamp = Date.now();
      console.log(`${newTimestamp - this.previous} -${e}`);
      this.previous = newTimestamp;
    });
  }

  ngOnInit() {
  }

  toggleDate(choice: number): void {
    this.toggleChoice(choice, this.selectedDates);
    this.fireSearch(`date:${choice}`);
  }

  private toggleChoice<T>(choice: T, selected: Array<T>): void {
    const pos = selected.indexOf(choice);
    if (pos < 0) {
      selected.push(choice);

    } else {
      selected.splice(pos, 1);
    }
  }

  toggleCategory(choice: string): void {
    this.toggleChoice(choice, this.selectedCategories);
    this.fireSearch(`category:${choice}`);
  }

  updateName(event): void {
    this.name = event.target.value;
  }

  search(): void {
    this.searchResults = null;
    this.searching = true;
    this.searchService.search(this.selectedDates,
      this.selectedCategories, this.name)
    .subscribe( r => {
      this.searching = false;
      this.searchResults = r;
    });
  }

  private fireSearch(event: string): void {
    if (this.bufferTimer == null) {
      this.bufferTimer = Observable.timer(5000);
      this.previous = Date.now();
      this.bufferTimer.subscribe(() => {
        this.releaseStream.next(true);
        this.bufferTimer = null;
      });
    }
    this.eventStream.next(event);
  }

  release(): void {
    this.releaseStream.next(true);
  }
}
