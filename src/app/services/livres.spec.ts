import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { LivresService } from './livres';

describe('LivresService', () => {
  let service: LivresService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(LivresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
