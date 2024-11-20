import { TestBed } from '@angular/core/testing';

import { SSSHService } from './s-ssh.service';

describe('SSSHService', () => {
  let service: SSSHService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SSSHService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
