import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { IFeedback } from 'app/entities/feedback/feedback.model';
import { FeedbackService } from 'app/entities/feedback/service/feedback.service';
import { IFeedbackSubType } from 'app/entities/feedback-sub-type/feedback-sub-type.model';
import { FeedbackSubTypeService } from 'app/entities/feedback-sub-type/service/feedback-sub-type.service';
import { IRating } from 'app/entities/rating/rating.model';
import { RatingService } from 'app/entities/rating/service/rating.service';
import { IFeedbackDetails } from '../feedback-details.model';
import { FeedbackDetailsService } from '../service/feedback-details.service';
import { FeedbackDetailsFormService } from './feedback-details-form.service';

import { FeedbackDetailsUpdateComponent } from './feedback-details-update.component';

describe('FeedbackDetails Management Update Component', () => {
  let comp: FeedbackDetailsUpdateComponent;
  let fixture: ComponentFixture<FeedbackDetailsUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let feedbackDetailsFormService: FeedbackDetailsFormService;
  let feedbackDetailsService: FeedbackDetailsService;
  let feedbackService: FeedbackService;
  let feedbackSubTypeService: FeedbackSubTypeService;
  let ratingService: RatingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FeedbackDetailsUpdateComponent],
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
      .overrideTemplate(FeedbackDetailsUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FeedbackDetailsUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    feedbackDetailsFormService = TestBed.inject(FeedbackDetailsFormService);
    feedbackDetailsService = TestBed.inject(FeedbackDetailsService);
    feedbackService = TestBed.inject(FeedbackService);
    feedbackSubTypeService = TestBed.inject(FeedbackSubTypeService);
    ratingService = TestBed.inject(RatingService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Feedback query and add missing value', () => {
      const feedbackDetails: IFeedbackDetails = { id: 456 };
      const feedbackdetails: IFeedback = { id: 31513 };
      feedbackDetails.feedbackdetails = feedbackdetails;

      const feedbackCollection: IFeedback[] = [{ id: 15075 }];
      jest.spyOn(feedbackService, 'query').mockReturnValue(of(new HttpResponse({ body: feedbackCollection })));
      const additionalFeedbacks = [feedbackdetails];
      const expectedCollection: IFeedback[] = [...additionalFeedbacks, ...feedbackCollection];
      jest.spyOn(feedbackService, 'addFeedbackToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ feedbackDetails });
      comp.ngOnInit();

      expect(feedbackService.query).toHaveBeenCalled();
      expect(feedbackService.addFeedbackToCollectionIfMissing).toHaveBeenCalledWith(
        feedbackCollection,
        ...additionalFeedbacks.map(expect.objectContaining),
      );
      expect(comp.feedbacksSharedCollection).toEqual(expectedCollection);
    });

    it('Should call FeedbackSubType query and add missing value', () => {
      const feedbackDetails: IFeedbackDetails = { id: 456 };
      const feedbacksubtypes: IFeedbackSubType = { id: 16475 };
      feedbackDetails.feedbacksubtypes = feedbacksubtypes;

      const feedbackSubTypeCollection: IFeedbackSubType[] = [{ id: 12656 }];
      jest.spyOn(feedbackSubTypeService, 'query').mockReturnValue(of(new HttpResponse({ body: feedbackSubTypeCollection })));
      const additionalFeedbackSubTypes = [feedbacksubtypes];
      const expectedCollection: IFeedbackSubType[] = [...additionalFeedbackSubTypes, ...feedbackSubTypeCollection];
      jest.spyOn(feedbackSubTypeService, 'addFeedbackSubTypeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ feedbackDetails });
      comp.ngOnInit();

      expect(feedbackSubTypeService.query).toHaveBeenCalled();
      expect(feedbackSubTypeService.addFeedbackSubTypeToCollectionIfMissing).toHaveBeenCalledWith(
        feedbackSubTypeCollection,
        ...additionalFeedbackSubTypes.map(expect.objectContaining),
      );
      expect(comp.feedbackSubTypesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Rating query and add missing value', () => {
      const feedbackDetails: IFeedbackDetails = { id: 456 };
      const ratings: IRating = { id: 17711 };
      feedbackDetails.ratings = ratings;

      const ratingCollection: IRating[] = [{ id: 24485 }];
      jest.spyOn(ratingService, 'query').mockReturnValue(of(new HttpResponse({ body: ratingCollection })));
      const additionalRatings = [ratings];
      const expectedCollection: IRating[] = [...additionalRatings, ...ratingCollection];
      jest.spyOn(ratingService, 'addRatingToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ feedbackDetails });
      comp.ngOnInit();

      expect(ratingService.query).toHaveBeenCalled();
      expect(ratingService.addRatingToCollectionIfMissing).toHaveBeenCalledWith(
        ratingCollection,
        ...additionalRatings.map(expect.objectContaining),
      );
      expect(comp.ratingsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const feedbackDetails: IFeedbackDetails = { id: 456 };
      const feedbackdetails: IFeedback = { id: 26146 };
      feedbackDetails.feedbackdetails = feedbackdetails;
      const feedbacksubtypes: IFeedbackSubType = { id: 9839 };
      feedbackDetails.feedbacksubtypes = feedbacksubtypes;
      const ratings: IRating = { id: 6968 };
      feedbackDetails.ratings = ratings;

      activatedRoute.data = of({ feedbackDetails });
      comp.ngOnInit();

      expect(comp.feedbacksSharedCollection).toContain(feedbackdetails);
      expect(comp.feedbackSubTypesSharedCollection).toContain(feedbacksubtypes);
      expect(comp.ratingsSharedCollection).toContain(ratings);
      expect(comp.feedbackDetails).toEqual(feedbackDetails);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFeedbackDetails>>();
      const feedbackDetails = { id: 123 };
      jest.spyOn(feedbackDetailsFormService, 'getFeedbackDetails').mockReturnValue(feedbackDetails);
      jest.spyOn(feedbackDetailsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ feedbackDetails });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: feedbackDetails }));
      saveSubject.complete();

      // THEN
      expect(feedbackDetailsFormService.getFeedbackDetails).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(feedbackDetailsService.update).toHaveBeenCalledWith(expect.objectContaining(feedbackDetails));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFeedbackDetails>>();
      const feedbackDetails = { id: 123 };
      jest.spyOn(feedbackDetailsFormService, 'getFeedbackDetails').mockReturnValue({ id: null });
      jest.spyOn(feedbackDetailsService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ feedbackDetails: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: feedbackDetails }));
      saveSubject.complete();

      // THEN
      expect(feedbackDetailsFormService.getFeedbackDetails).toHaveBeenCalled();
      expect(feedbackDetailsService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFeedbackDetails>>();
      const feedbackDetails = { id: 123 };
      jest.spyOn(feedbackDetailsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ feedbackDetails });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(feedbackDetailsService.update).toHaveBeenCalled();
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

    describe('compareFeedbackSubType', () => {
      it('Should forward to feedbackSubTypeService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(feedbackSubTypeService, 'compareFeedbackSubType');
        comp.compareFeedbackSubType(entity, entity2);
        expect(feedbackSubTypeService.compareFeedbackSubType).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareRating', () => {
      it('Should forward to ratingService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(ratingService, 'compareRating');
        comp.compareRating(entity, entity2);
        expect(ratingService.compareRating).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
