import { TestBed } from '@angular/core/testing';

import { FeedbackReportService } from './feedback-report.service';

describe('FeedbackReportService', () => {
  let service: FeedbackReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeedbackReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
