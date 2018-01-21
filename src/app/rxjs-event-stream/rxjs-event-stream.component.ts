import { Component, OnInit } from '@angular/core';
import { MovieSearchService } from './movie-search.service';

@Component({
  selector: 'app-rxjs-event-stream',
  templateUrl: './rxjs-event-stream.component.html',
  styleUrls: ['./rxjs-event-stream.component.css']
})
export class RxjsEventStreamComponent implements OnInit {

  name: string = null;
  private selectedDates: number[] = [];
  private selectedCategories: string[] = [];

  searchResults: string;

  constructor(private searchService: MovieSearchService) { }

  ngOnInit() {
  }

  toggleDate(choice: number): void {
    this.toggleChoice(choice, this.selectedDates);
    this.fireSearch();
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
    this.fireSearch();
  }

  updateName(event): void {
    this.name = event.target.value;
  }

  search(): void {
    this.searchService.search(this.selectedDates,
      this.selectedCategories, this.name)
    .subscribe( r => {
      this.searchResults = r;
    });
  }

  private fireSearch(): void {
    this.search();
  }
}
