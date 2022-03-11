import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SellstockPage } from './sellstock.page';

describe('SellstockPage', () => {
  let component: SellstockPage;
  let fixture: ComponentFixture<SellstockPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellstockPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SellstockPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
