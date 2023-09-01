import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthentificationPage } from './authentification.page';

describe('AuthentificationPage', () => {
  let component: AuthentificationPage;
  let fixture: ComponentFixture<AuthentificationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AuthentificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
