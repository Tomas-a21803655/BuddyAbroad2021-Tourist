import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TripBoughtPage } from './trip-bought.page';

describe('TripBoughtPage', () => {
  let component: TripBoughtPage;
  let fixture: ComponentFixture<TripBoughtPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripBoughtPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TripBoughtPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
