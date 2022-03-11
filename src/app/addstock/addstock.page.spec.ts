import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddstockPage } from './addstock.page';

describe('AddstockPage', () => {
  let component: AddstockPage;
  let fixture: ComponentFixture<AddstockPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddstockPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddstockPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
