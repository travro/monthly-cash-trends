import { TestBed, inject } from '@angular/core/testing';

import { TransactionRepositoryService } from './transaction-repository.service';

describe('TransactionRepositoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransactionRepositoryService]
    });
  });

  it('should be created', inject([TransactionRepositoryService], (service: TransactionRepositoryService) => {
    expect(service).toBeTruthy();
  }));
});
