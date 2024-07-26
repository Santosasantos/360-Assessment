import { IFeedbackDetails, NewFeedbackDetails } from './feedback-details.model';

export const sampleWithRequiredData: IFeedbackDetails = {
  id: 25742,
};

export const sampleWithPartialData: IFeedbackDetails = {
  id: 16175,
  commentsforfeedbacksubtype: 'constant',
};

export const sampleWithFullData: IFeedbackDetails = {
  id: 14766,
  commentsforfeedbacksubtype: 'over gadzooks',
};

export const sampleWithNewData: NewFeedbackDetails = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
