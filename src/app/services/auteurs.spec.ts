import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AuteursService } from './auteurs';

describe('AuteursService', () => {
  let service: AuteursService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AuteursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
