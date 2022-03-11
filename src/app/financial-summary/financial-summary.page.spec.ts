import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FinancialSummaryPage } from './financial-summary.page';

describe('FinancialSummaryPage', () => {
  let component: FinancialSummaryPage;
  let fixture: ComponentFixture<FinancialSummaryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialSummaryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FinancialSummaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
