import { TestBed } from '@angular/core/testing';

import { UtilisateurAuthService } from './utilisateur-auth.service';

describe('UtilisateurAuthService', () => {
  let service: UtilisateurAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilisateurAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
