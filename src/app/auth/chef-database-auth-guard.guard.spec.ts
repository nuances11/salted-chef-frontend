import { TestBed } from '@angular/core/testing';

import { ChefDatabaseAuthGuardGuard } from './chef-database-auth-guard.guard';

describe('ChefDatabaseAuthGuardGuard', () => {
  let guard: ChefDatabaseAuthGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ChefDatabaseAuthGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
