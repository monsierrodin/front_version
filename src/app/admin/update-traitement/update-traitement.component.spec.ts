import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTraitementComponent } from './update-traitement.component';

describe('UpdateTraitementComponent', () => {
  let component: UpdateTraitementComponent;
  let fixture: ComponentFixture<UpdateTraitementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTraitementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTraitementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
