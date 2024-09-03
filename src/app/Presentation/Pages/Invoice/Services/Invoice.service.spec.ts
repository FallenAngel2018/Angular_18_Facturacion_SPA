/* tslint:disable:no-unused-variable */

import { TestBed, waitForAsync, inject } from '@angular/core/testing';
import { InvoiceService } from './Invoice.service';

describe('Service: Invoice', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InvoiceService]
    });
  });

  it('should ...', inject([InvoiceService], (service: InvoiceService) => {
    expect(service).toBeTruthy();
  }));
});
