import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductInventoryComponent } from './add-product-inventory.component';

describe('AddProductInventoryComponent', () => {
  let component: AddProductInventoryComponent;
  let fixture: ComponentFixture<AddProductInventoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddProductInventoryComponent]
    });
    fixture = TestBed.createComponent(AddProductInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
