import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { formatifGuard } from './formatif.guard';

describe('formatifGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => formatifGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
