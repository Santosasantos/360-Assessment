import { IExtraquestion, NewExtraquestion } from './extraquestion.model';

export const sampleWithRequiredData: IExtraquestion = {
  id: 30773,
  question: 'yowza',
};

export const sampleWithPartialData: IExtraquestion = {
  id: 9891,
  question: 'savior woeful',
};

export const sampleWithFullData: IExtraquestion = {
  id: 30691,
  question: 'daub yuck',
  questionfeedback: 'high-level',
};

export const sampleWithNewData: NewExtraquestion = {
  question: 'gong astride hex',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
