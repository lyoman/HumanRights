import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddstockViewPage } from './addstock-view.page';

describe('AddstockViewPage', () => {
  let component: AddstockViewPage;
  let fixture: ComponentFixture<AddstockViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddstockViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddstockViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
