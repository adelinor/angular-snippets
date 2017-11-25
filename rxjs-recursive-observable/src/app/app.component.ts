import { Component } from '@angular/core';
import { PaginationService } from './pagination/pagination.service';

@Component({
  providers: [ PaginationService ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  link = '';
  linkList = [];

  constructor(private paginationService: PaginationService) {}

  showLink(linkName: string): void {
    this.paginationService.showLink(linkName).subscribe( s => {
      this.link = s;
    });
  }

  fetchLinkList(): void {
    this.paginationService.allPagesLinks().subscribe( list => {
      this.linkList = list;
    });
  }

}
