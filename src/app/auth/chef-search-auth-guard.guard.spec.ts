import { TestBed } from '@angular/core/testing';

import { ChefSearchAuthGuardGuard } from './chef-search-auth-guard.guard';

describe('ChefSearchAuthGuardGuard', () => {
  let guard: ChefSearchAuthGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ChefSearchAuthGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
