import { TestBed, inject } from '@angular/core/testing';

import { MovieSearchService } from './movie-search.service';

describe('MovieSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovieSearchService]
    });
  });

  it('should be created', inject([MovieSearchService], (service: MovieSearchService) => {
    expect(service).toBeTruthy();
  }));
});
