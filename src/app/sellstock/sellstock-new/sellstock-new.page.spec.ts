import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SellstockNewPage } from './sellstock-new.page';

describe('SellstockNewPage', () => {
  let component: SellstockNewPage;
  let fixture: ComponentFixture<SellstockNewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellstockNewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SellstockNewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
