import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillPaymentComponent } from './bill-payment.component';

describe('BillPaymentComponent', () => {
  let component: BillPaymentComponent;
  let fixture: ComponentFixture<BillPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillPaymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
