import { inject, Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IFeedbackDetails, NewFeedbackDetails } from '../feedback-details.model';
import {
  FeedbackReportService
} from '../../../feedback-request/feedback-report/report-service/feedback-report.service';
import { IRating } from '../../rating/rating.model';
import { HttpResponse } from '@angular/common/http';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFeedbackDetails for edit and NewFeedbackDetailsFormGroupInput for create.
 */
type FeedbackDetailsFormGroupInput = IFeedbackDetails | PartialWithRequiredKeyOf<NewFeedbackDetails>;

type FeedbackDetailsFormDefaults = Pick<NewFeedbackDetails, 'id'>;

type FeedbackDetailsFormGroupContent = {
  id: FormControl<IFeedbackDetails['id'] | NewFeedbackDetails['id']>;
  commentsforfeedbacksubtype: FormControl<IFeedbackDetails['commentsforfeedbacksubtype']>;
  feedbackstatus: FormControl<IFeedbackDetails['feedbackstatus']>;
  feedbackdetails: FormControl<IFeedbackDetails['feedbackdetails']>;
  feedbacksubtypes: FormControl<IFeedbackDetails['feedbacksubtypes']>;
  ratings: FormControl<IFeedbackDetails['ratings']>;
};

export type FeedbackDetailsFormGroup = FormGroup<FeedbackDetailsFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FeedbackDetailsFormService {
  protected feedbackreportService = inject(FeedbackReportService);

  createFeedbackDetailsFormGroup(feedbackDetails: FeedbackDetailsFormGroupInput = { id: null }): FeedbackDetailsFormGroup {
    const feedbackDetailsRawValue = {
      ...this.getFormDefaults(),
      ...feedbackDetails,
    };
    return new FormGroup<FeedbackDetailsFormGroupContent>({
      id: new FormControl(
        { value: feedbackDetailsRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      commentsforfeedbacksubtype: new FormControl(feedbackDetailsRawValue.commentsforfeedbacksubtype),
      feedbackstatus: new FormControl(feedbackDetailsRawValue.feedbackstatus),
      feedbackdetails: new FormControl(feedbackDetailsRawValue.feedbackdetails),
      feedbacksubtypes: new FormControl(feedbackDetailsRawValue.feedbacksubtypes),
      ratings: new FormControl(feedbackDetailsRawValue.ratings),
    });
  }

  getFeedbackDetails(form: FeedbackDetailsFormGroup): IFeedbackDetails | NewFeedbackDetails {
    return form.getRawValue() as IFeedbackDetails | NewFeedbackDetails;
  }

  async transformToNewFeedbackDetails(form: any, ratingvalue: number): Promise<NewFeedbackDetails> {
    let feedbackDetails = this.getFeedbackDetails(form) as IFeedbackDetails | NewFeedbackDetails;
    let rating: IRating | null | undefined = null;

    try {
      const response = await this.feedbackreportService.findbyratingvalue(ratingvalue).toPromise();
      rating = response?.body;
      console.log('ratings:', rating);
    } catch (error) {
      console.error('Error loading data:', error);
    }

    return {
      commentsforfeedbacksubtype: feedbackDetails.commentsforfeedbacksubtype,
      feedbackstatus: feedbackDetails.feedbackstatus,
      feedbackdetails: feedbackDetails.feedbackdetails,
      feedbacksubtypes: feedbackDetails.feedbacksubtypes,
      ratings: rating, // Assign the fetched rating here
      id: null, // Ensure id is null for NewFeedbackDetails
    };
  }

  resetForm(form: FeedbackDetailsFormGroup, feedbackDetails: FeedbackDetailsFormGroupInput): void {
    const feedbackDetailsRawValue = { ...this.getFormDefaults(), ...feedbackDetails };
    form.reset(
      {
        ...feedbackDetailsRawValue,
        id: { value: feedbackDetailsRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): FeedbackDetailsFormDefaults {
    return {
      id: null,
    };
  }
}
