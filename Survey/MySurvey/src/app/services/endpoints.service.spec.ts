import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

import { EndpointsService } from './endpoints.service';

describe('EndpointsService', () => {
  let service: EndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule], // Add HttpClientModule to the imports array
    });
    service = TestBed.inject(EndpointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
