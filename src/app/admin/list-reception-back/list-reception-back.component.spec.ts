import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReceptionBackComponent } from './list-reception-back.component';

describe('ListReceptionBackComponent', () => {
  let component: ListReceptionBackComponent;
  let fixture: ComponentFixture<ListReceptionBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListReceptionBackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListReceptionBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
