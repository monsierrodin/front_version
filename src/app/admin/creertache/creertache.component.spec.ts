import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreertacheComponent } from './creertache.component';

describe('CreertacheComponent', () => {
  let component: CreertacheComponent;
  let fixture: ComponentFixture<CreertacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreertacheComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreertacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
