import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogModel } from './dialog-model';

describe('DialogModel', () => {
  let component: DialogModel;
  let fixture: ComponentFixture<DialogModel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogModel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogModel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
