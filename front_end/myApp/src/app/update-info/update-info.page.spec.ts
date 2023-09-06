import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateInfoPage } from './update-info.page';

describe('UpdateInfoPage', () => {
  let component: UpdateInfoPage;
  let fixture: ComponentFixture<UpdateInfoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdateInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
function async(arg0: () => void): jasmine.ImplementationCallback {
  throw new Error('Function not implemented.');
}

