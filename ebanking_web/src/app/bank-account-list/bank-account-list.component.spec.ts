import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAccountListComponent } from './bank-account-list.component';

describe('BankAccountListComponent', () => {
  let component: BankAccountListComponent;
  let fixture: ComponentFixture<BankAccountListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankAccountListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankAccountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
