import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprosComponent } from './apros.component';

describe('AprosComponent', () => {
  let component: AprosComponent;
  let fixture: ComponentFixture<AprosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AprosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AprosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
