import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IFeedback } from 'app/entities/feedback/feedback.model';
import { FeedbackService } from 'app/entities/feedback/service/feedback.service';
import { IFeedbackSubType } from 'app/entities/feedback-sub-type/feedback-sub-type.model';
import { FeedbackSubTypeService } from 'app/entities/feedback-sub-type/service/feedback-sub-type.service';
import { IRating } from 'app/entities/rating/rating.model';
import { RatingService } from 'app/entities/rating/service/rating.service';
import { FeedbackDetailsService } from '../service/feedback-details.service';
import { IFeedbackDetails } from '../feedback-details.model';
import { FeedbackDetailsFormService, FeedbackDetailsFormGroup } from './feedback-details-form.service';

@Component({
  standalone: true,
  selector: 'jhi-feedback-details-update',
  templateUrl: './feedback-details-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class FeedbackDetailsUpdateComponent implements OnInit {
  isSaving = false;
  feedbackDetails: IFeedbackDetails | null = null;

  feedbacksSharedCollection: IFeedback[] = [];
  feedbackSubTypesSharedCollection: IFeedbackSubType[] = [];
  ratingsSharedCollection: IRating[] = [];

  protected feedbackDetailsService = inject(FeedbackDetailsService);
  protected feedbackDetailsFormService = inject(FeedbackDetailsFormService);
  protected feedbackService = inject(FeedbackService);
  protected feedbackSubTypeService = inject(FeedbackSubTypeService);
  protected ratingService = inject(RatingService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: FeedbackDetailsFormGroup = this.feedbackDetailsFormService.createFeedbackDetailsFormGroup();

  compareFeedback = (o1: IFeedback | null, o2: IFeedback | null): boolean => this.feedbackService.compareFeedback(o1, o2);

  compareFeedbackSubType = (o1: IFeedbackSubType | null, o2: IFeedbackSubType | null): boolean =>
    this.feedbackSubTypeService.compareFeedbackSubType(o1, o2);

  compareRating = (o1: IRating | null, o2: IRating | null): boolean => this.ratingService.compareRating(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ feedbackDetails }) => {
      this.feedbackDetails = feedbackDetails;
      if (feedbackDetails) {
        this.updateForm(feedbackDetails);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const feedbackDetails = this.feedbackDetailsFormService.getFeedbackDetails(this.editForm);
    if (feedbackDetails.id !== null) {
      this.subscribeToSaveResponse(this.feedbackDetailsService.update(feedbackDetails));
    } else {
      this.subscribeToSaveResponse(this.feedbackDetailsService.create(feedbackDetails));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFeedbackDetails>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(feedbackDetails: IFeedbackDetails): void {
    this.feedbackDetails = feedbackDetails;
    this.feedbackDetailsFormService.resetForm(this.editForm, feedbackDetails);

    this.feedbacksSharedCollection = this.feedbackService.addFeedbackToCollectionIfMissing<IFeedback>(
      this.feedbacksSharedCollection,
      feedbackDetails.feedbackdetails,
    );
    this.feedbackSubTypesSharedCollection = this.feedbackSubTypeService.addFeedbackSubTypeToCollectionIfMissing<IFeedbackSubType>(
      this.feedbackSubTypesSharedCollection,
      feedbackDetails.feedbacksubtypes,
    );
    this.ratingsSharedCollection = this.ratingService.addRatingToCollectionIfMissing<IRating>(
      this.ratingsSharedCollection,
      feedbackDetails.ratings,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.feedbackService
      .query()
      .pipe(map((res: HttpResponse<IFeedback[]>) => res.body ?? []))
      .pipe(
        map((feedbacks: IFeedback[]) =>
          this.feedbackService.addFeedbackToCollectionIfMissing<IFeedback>(feedbacks, this.feedbackDetails?.feedbackdetails),
        ),
      )
      .subscribe((feedbacks: IFeedback[]) => (this.feedbacksSharedCollection = feedbacks));

    this.feedbackSubTypeService
      .query()
      .pipe(map((res: HttpResponse<IFeedbackSubType[]>) => res.body ?? []))
      .pipe(
        map((feedbackSubTypes: IFeedbackSubType[]) =>
          this.feedbackSubTypeService.addFeedbackSubTypeToCollectionIfMissing<IFeedbackSubType>(
            feedbackSubTypes,
            this.feedbackDetails?.feedbacksubtypes,
          ),
        ),
      )
      .subscribe((feedbackSubTypes: IFeedbackSubType[]) => (this.feedbackSubTypesSharedCollection = feedbackSubTypes));

    this.ratingService
      .query()
      .pipe(map((res: HttpResponse<IRating[]>) => res.body ?? []))
      .pipe(map((ratings: IRating[]) => this.ratingService.addRatingToCollectionIfMissing<IRating>(ratings, this.feedbackDetails?.ratings)))
      .subscribe((ratings: IRating[]) => (this.ratingsSharedCollection = ratings));
  }
}
