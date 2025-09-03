import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { UtilisateursService } from './utilisateurs';

describe('UtilisateursService', () => {
  let service: UtilisateursService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(UtilisateursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
