import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddstockNewPage } from './addstock-new.page';

describe('AddstockNewPage', () => {
  let component: AddstockNewPage;
  let fixture: ComponentFixture<AddstockNewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddstockNewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddstockNewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
