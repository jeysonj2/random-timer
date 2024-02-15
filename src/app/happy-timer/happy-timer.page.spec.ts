import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HappyTimerPage } from './happy-timer.page';

describe('HappyTimerPage', () => {
  let component: HappyTimerPage;
  let fixture: ComponentFixture<HappyTimerPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HappyTimerPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HappyTimerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
