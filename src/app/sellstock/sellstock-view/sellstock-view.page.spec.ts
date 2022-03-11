import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SellstockViewPage } from './sellstock-view.page';

describe('SellstockViewPage', () => {
  let component: SellstockViewPage;
  let fixture: ComponentFixture<SellstockViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellstockViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SellstockViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
