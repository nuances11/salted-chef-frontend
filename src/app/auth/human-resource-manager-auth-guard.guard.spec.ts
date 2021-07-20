import { TestBed } from '@angular/core/testing';

import { HumanResourceManagerAuthGuardGuard } from './human-resource-manager-auth-guard.guard';

describe('HumanResourceManagerAuthGuardGuard', () => {
  let guard: HumanResourceManagerAuthGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HumanResourceManagerAuthGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
