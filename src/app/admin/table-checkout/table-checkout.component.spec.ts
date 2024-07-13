import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCheckoutCardComponent } from './table-checkout.component';

describe('TableCheckoutComponent', () => {
  let component: TableCheckoutCardComponent;
  let fixture: ComponentFixture<TableCheckoutCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableCheckoutCardComponent]
    });
    fixture = TestBed.createComponent(TableCheckoutCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
