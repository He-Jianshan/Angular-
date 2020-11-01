import { TestBed } from '@angular/core/testing';

import { MyState } from './mystate.service';

describe('MystateService', () => {
  let service: MyState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
