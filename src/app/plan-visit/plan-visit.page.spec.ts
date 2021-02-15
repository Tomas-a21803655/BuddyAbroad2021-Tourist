import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlanVisitPage } from './plan-visit.page';

describe('PlanVisitPage', () => {
  let component: PlanVisitPage;
  let fixture: ComponentFixture<PlanVisitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanVisitPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlanVisitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
