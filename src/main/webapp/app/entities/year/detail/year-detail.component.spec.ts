import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { YearDetailComponent } from './year-detail.component';

describe('Year Management Detail Component', () => {
  let comp: YearDetailComponent;
  let fixture: ComponentFixture<YearDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YearDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: YearDetailComponent,
              resolve: { year: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(YearDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YearDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load year on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', YearDetailComponent);

      // THEN
      expect(instance.year()).toEqual(expect.objectContaining({ id: 123 }));
    });
  });

  describe('PreviousState', () => {
    it('Should navigate to previous state', () => {
      jest.spyOn(window.history, 'back');
      comp.previousState();
      expect(window.history.back).toHaveBeenCalled();
    });
  });
});
