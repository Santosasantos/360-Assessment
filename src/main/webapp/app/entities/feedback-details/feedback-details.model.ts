import { IFeedback } from 'app/entities/feedback/feedback.model';
import { IFeedbackSubType } from 'app/entities/feedback-sub-type/feedback-sub-type.model';
import { IRating } from 'app/entities/rating/rating.model';

export interface IFeedbackDetails {
  id: number;
  commentsforfeedbacksubtype?: string | null;
  feedbackstatus?: string | null;
  feedbackdetails?: IFeedback | null;
  feedbacksubtypes?: IFeedbackSubType | null;
  ratings?: IRating | null;
}

export type NewFeedbackDetails = Omit<IFeedbackDetails, 'id'> & { id: null };
