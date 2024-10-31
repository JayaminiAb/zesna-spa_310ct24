import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportReportListComponent } from './transport-report-list.component';

describe('TransportReportListComponent', () => {
  let component: TransportReportListComponent;
  let fixture: ComponentFixture<TransportReportListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransportReportListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransportReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
