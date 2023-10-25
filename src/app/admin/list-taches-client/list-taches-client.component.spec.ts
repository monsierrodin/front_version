import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTachesClientComponent } from './list-taches-client.component';

describe('ListTachesClientComponent', () => {
  let component: ListTachesClientComponent;
  let fixture: ComponentFixture<ListTachesClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTachesClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTachesClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
