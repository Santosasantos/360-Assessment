import { IFeedbackType, NewFeedbackType } from './feedback-type.model';

export const sampleWithRequiredData: IFeedbackType = {
  id: 3335,
  feedbackname: 'quick-witted commonly major',
};

export const sampleWithPartialData: IFeedbackType = {
  id: 19727,
  feedbackname: 'chill',
};

export const sampleWithFullData: IFeedbackType = {
  id: 24668,
  feedbackname: 'whoever revascularization',
};

export const sampleWithNewData: NewFeedbackType = {
  feedbackname: 'whether signal',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
