import { TestBed } from '@angular/core/testing';

import { CreertacheService } from './creertache.service';

describe('CreertacheService', () => {
  let service: CreertacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreertacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
