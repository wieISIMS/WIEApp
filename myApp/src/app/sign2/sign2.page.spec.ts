import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Sign2Page } from './sign2.page';

describe('Sign2Page', () => {
  let component: Sign2Page;
  let fixture: ComponentFixture<Sign2Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Sign2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
