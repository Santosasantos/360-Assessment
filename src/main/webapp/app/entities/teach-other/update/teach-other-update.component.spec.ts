import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { IFeedback } from 'app/entities/feedback/feedback.model';
import { FeedbackService } from 'app/entities/feedback/service/feedback.service';
import { TeachOtherService } from '../service/teach-other.service';
import { ITeachOther } from '../teach-other.model';
import { TeachOtherFormService } from './teach-other-form.service';

import { TeachOtherUpdateComponent } from './teach-other-update.component';

describe('TeachOther Management Update Component', () => {
  let comp: TeachOtherUpdateComponent;
  let fixture: ComponentFixture<TeachOtherUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let teachOtherFormService: TeachOtherFormService;
  let teachOtherService: TeachOtherService;
  let feedbackService: FeedbackService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TeachOtherUpdateComponent],
      providers: [
        provideHttpClient(),
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(TeachOtherUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TeachOtherUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    teachOtherFormService = TestBed.inject(TeachOtherFormService);
    teachOtherService = TestBed.inject(TeachOtherService);
    feedbackService = TestBed.inject(FeedbackService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Feedback query and add missing value', () => {
      const teachOther: ITeachOther = { id: 456 };
      const teachother: IFeedback = { id: 23061 };
      teachOther.teachother = teachother;

      const feedbackCollection: IFeedback[] = [{ id: 5188 }];
      jest.spyOn(feedbackService, 'query').mockReturnValue(of(new HttpResponse({ body: feedbackCollection })));
      const additionalFeedbacks = [teachother];
      const expectedCollection: IFeedback[] = [...additionalFeedbacks, ...feedbackCollection];
      jest.spyOn(feedbackService, 'addFeedbackToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ teachOther });
      comp.ngOnInit();

      expect(feedbackService.query).toHaveBeenCalled();
      expect(feedbackService.addFeedbackToCollectionIfMissing).toHaveBeenCalledWith(
        feedbackCollection,
        ...additionalFeedbacks.map(expect.objectContaining),
      );
      expect(comp.feedbacksSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const teachOther: ITeachOther = { id: 456 };
      const teachother: IFeedback = { id: 3932 };
      teachOther.teachother = teachother;

      activatedRoute.data = of({ teachOther });
      comp.ngOnInit();

      expect(comp.feedbacksSharedCollection).toContain(teachother);
      expect(comp.teachOther).toEqual(teachOther);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITeachOther>>();
      const teachOther = { id: 123 };
      jest.spyOn(teachOtherFormService, 'getTeachOther').mockReturnValue(teachOther);
      jest.spyOn(teachOtherService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ teachOther });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: teachOther }));
      saveSubject.complete();

      // THEN
      expect(teachOtherFormService.getTeachOther).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(teachOtherService.update).toHaveBeenCalledWith(expect.objectContaining(teachOther));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITeachOther>>();
      const teachOther = { id: 123 };
      jest.spyOn(teachOtherFormService, 'getTeachOther').mockReturnValue({ id: null });
      jest.spyOn(teachOtherService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ teachOther: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: teachOther }));
      saveSubject.complete();

      // THEN
      expect(teachOtherFormService.getTeachOther).toHaveBeenCalled();
      expect(teachOtherService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITeachOther>>();
      const teachOther = { id: 123 };
      jest.spyOn(teachOtherService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ teachOther });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(teachOtherService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareFeedback', () => {
      it('Should forward to feedbackService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(feedbackService, 'compareFeedback');
        comp.compareFeedback(entity, entity2);
        expect(feedbackService.compareFeedback).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
