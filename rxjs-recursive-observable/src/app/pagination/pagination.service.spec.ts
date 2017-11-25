import { TestBed, inject } from '@angular/core/testing';

import {HttpClientTestingModule} from '@angular/common/http/testing';

import { PaginationService } from './pagination.service';

describe('PaginationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PaginationService]
    });
  });

  it('should be created', inject([PaginationService], (service: PaginationService) => {
    expect(service).toBeTruthy();
  }));
});
