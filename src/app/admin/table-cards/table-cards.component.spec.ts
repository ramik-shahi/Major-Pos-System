import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCardsComponent } from './table-cards.component';

describe('TableCardsComponent', () => {
  let component: TableCardsComponent;
  let fixture: ComponentFixture<TableCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableCardsComponent]
    });
    fixture = TestBed.createComponent(TableCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
