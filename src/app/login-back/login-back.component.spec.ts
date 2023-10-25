import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginBackComponent } from './login-back.component';

describe('LoginBackComponent', () => {
  let component: LoginBackComponent;
  let fixture: ComponentFixture<LoginBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginBackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
