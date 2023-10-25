import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TachetraiterComponent } from './tachetraiter.component';

describe('TachetraiterComponent', () => {
  let component: TachetraiterComponent;
  let fixture: ComponentFixture<TachetraiterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TachetraiterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TachetraiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
