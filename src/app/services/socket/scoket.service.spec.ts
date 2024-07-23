import { TestBed } from '@angular/core/testing';

import { SocketService } from './scoket.service'; 

describe('ScoketService', () => {
  let service: SocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
