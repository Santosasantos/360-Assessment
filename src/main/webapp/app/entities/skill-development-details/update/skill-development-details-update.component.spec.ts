import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { IFeedback } from 'app/entities/feedback/feedback.model';
import { FeedbackService } from 'app/entities/feedback/service/feedback.service';
import { ISkillDevelopmentType } from 'app/entities/skill-development-type/skill-development-type.model';
import { SkillDevelopmentTypeService } from 'app/entities/skill-development-type/service/skill-development-type.service';
import { ISkillDevelopmentDetails } from '../skill-development-details.model';
import { SkillDevelopmentDetailsService } from '../service/skill-development-details.service';
import { SkillDevelopmentDetailsFormService } from './skill-development-details-form.service';

import { SkillDevelopmentDetailsUpdateComponent } from './skill-development-details-update.component';

describe('SkillDevelopmentDetails Management Update Component', () => {
  let comp: SkillDevelopmentDetailsUpdateComponent;
  let fixture: ComponentFixture<SkillDevelopmentDetailsUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let skillDevelopmentDetailsFormService: SkillDevelopmentDetailsFormService;
  let skillDevelopmentDetailsService: SkillDevelopmentDetailsService;
  let feedbackService: FeedbackService;
  let skillDevelopmentTypeService: SkillDevelopmentTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SkillDevelopmentDetailsUpdateComponent],
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
      .overrideTemplate(SkillDevelopmentDetailsUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SkillDevelopmentDetailsUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    skillDevelopmentDetailsFormService = TestBed.inject(SkillDevelopmentDetailsFormService);
    skillDevelopmentDetailsService = TestBed.inject(SkillDevelopmentDetailsService);
    feedbackService = TestBed.inject(FeedbackService);
    skillDevelopmentTypeService = TestBed.inject(SkillDevelopmentTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Feedback query and add missing value', () => {
      const skillDevelopmentDetails: ISkillDevelopmentDetails = { id: 456 };
      const skilldevelopment: IFeedback = { id: 12878 };
      skillDevelopmentDetails.skilldevelopment = skilldevelopment;

      const feedbackCollection: IFeedback[] = [{ id: 17332 }];
      jest.spyOn(feedbackService, 'query').mockReturnValue(of(new HttpResponse({ body: feedbackCollection })));
      const additionalFeedbacks = [skilldevelopment];
      const expectedCollection: IFeedback[] = [...additionalFeedbacks, ...feedbackCollection];
      jest.spyOn(feedbackService, 'addFeedbackToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ skillDevelopmentDetails });
      comp.ngOnInit();

      expect(feedbackService.query).toHaveBeenCalled();
      expect(feedbackService.addFeedbackToCollectionIfMissing).toHaveBeenCalledWith(
        feedbackCollection,
        ...additionalFeedbacks.map(expect.objectContaining),
      );
      expect(comp.feedbacksSharedCollection).toEqual(expectedCollection);
    });

    it('Should call SkillDevelopmentType query and add missing value', () => {
      const skillDevelopmentDetails: ISkillDevelopmentDetails = { id: 456 };
      const skilldevelopmenttypes: ISkillDevelopmentType = { id: 28426 };
      skillDevelopmentDetails.skilldevelopmenttypes = skilldevelopmenttypes;

      const skillDevelopmentTypeCollection: ISkillDevelopmentType[] = [{ id: 26067 }];
      jest.spyOn(skillDevelopmentTypeService, 'query').mockReturnValue(of(new HttpResponse({ body: skillDevelopmentTypeCollection })));
      const additionalSkillDevelopmentTypes = [skilldevelopmenttypes];
      const expectedCollection: ISkillDevelopmentType[] = [...additionalSkillDevelopmentTypes, ...skillDevelopmentTypeCollection];
      jest.spyOn(skillDevelopmentTypeService, 'addSkillDevelopmentTypeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ skillDevelopmentDetails });
      comp.ngOnInit();

      expect(skillDevelopmentTypeService.query).toHaveBeenCalled();
      expect(skillDevelopmentTypeService.addSkillDevelopmentTypeToCollectionIfMissing).toHaveBeenCalledWith(
        skillDevelopmentTypeCollection,
        ...additionalSkillDevelopmentTypes.map(expect.objectContaining),
      );
      expect(comp.skillDevelopmentTypesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const skillDevelopmentDetails: ISkillDevelopmentDetails = { id: 456 };
      const skilldevelopment: IFeedback = { id: 7285 };
      skillDevelopmentDetails.skilldevelopment = skilldevelopment;
      const skilldevelopmenttypes: ISkillDevelopmentType = { id: 29468 };
      skillDevelopmentDetails.skilldevelopmenttypes = skilldevelopmenttypes;

      activatedRoute.data = of({ skillDevelopmentDetails });
      comp.ngOnInit();

      expect(comp.feedbacksSharedCollection).toContain(skilldevelopment);
      expect(comp.skillDevelopmentTypesSharedCollection).toContain(skilldevelopmenttypes);
      expect(comp.skillDevelopmentDetails).toEqual(skillDevelopmentDetails);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISkillDevelopmentDetails>>();
      const skillDevelopmentDetails = { id: 123 };
      jest.spyOn(skillDevelopmentDetailsFormService, 'getSkillDevelopmentDetails').mockReturnValue(skillDevelopmentDetails);
      jest.spyOn(skillDevelopmentDetailsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ skillDevelopmentDetails });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: skillDevelopmentDetails }));
      saveSubject.complete();

      // THEN
      expect(skillDevelopmentDetailsFormService.getSkillDevelopmentDetails).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(skillDevelopmentDetailsService.update).toHaveBeenCalledWith(expect.objectContaining(skillDevelopmentDetails));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISkillDevelopmentDetails>>();
      const skillDevelopmentDetails = { id: 123 };
      jest.spyOn(skillDevelopmentDetailsFormService, 'getSkillDevelopmentDetails').mockReturnValue({ id: null });
      jest.spyOn(skillDevelopmentDetailsService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ skillDevelopmentDetails: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: skillDevelopmentDetails }));
      saveSubject.complete();

      // THEN
      expect(skillDevelopmentDetailsFormService.getSkillDevelopmentDetails).toHaveBeenCalled();
      expect(skillDevelopmentDetailsService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISkillDevelopmentDetails>>();
      const skillDevelopmentDetails = { id: 123 };
      jest.spyOn(skillDevelopmentDetailsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ skillDevelopmentDetails });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(skillDevelopmentDetailsService.update).toHaveBeenCalled();
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

    describe('compareSkillDevelopmentType', () => {
      it('Should forward to skillDevelopmentTypeService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(skillDevelopmentTypeService, 'compareSkillDevelopmentType');
        comp.compareSkillDevelopmentType(entity, entity2);
        expect(skillDevelopmentTypeService.compareSkillDevelopmentType).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
