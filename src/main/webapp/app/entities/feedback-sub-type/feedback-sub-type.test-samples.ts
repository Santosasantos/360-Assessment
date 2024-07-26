import { IFeedbackSubType, NewFeedbackSubType } from './feedback-sub-type.model';

export const sampleWithRequiredData: IFeedbackSubType = {
  id: 9785,
  feedbacksubname: 'midst',
  feedbackdescription: 'whereas undergo',
};

export const sampleWithPartialData: IFeedbackSubType = {
  id: 21498,
  feedbacksubname: 'mix quaintly',
  feedbackdescription: 'meh voluntarily phooey',
};

export const sampleWithFullData: IFeedbackSubType = {
  id: 13331,
  feedbacksubname: 'geez renovate whose',
  feedbackdescription: 'ugh whereas only',
};

export const sampleWithNewData: NewFeedbackSubType = {
  feedbacksubname: 'um vainly towards',
  feedbackdescription: 'wearily cute',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
