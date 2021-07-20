import { TestBed } from '@angular/core/testing';

import { HumanResourceAuthGuardGuard } from './human-resource-auth-guard.guard';

describe('HumanResourceAuthGuardGuard', () => {
  let guard: HumanResourceAuthGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HumanResourceAuthGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
