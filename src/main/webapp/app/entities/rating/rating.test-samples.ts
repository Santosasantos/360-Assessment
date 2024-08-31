import { IRating, NewRating } from './rating.model';

export const sampleWithRequiredData: IRating = {
  id: 24888,
  rating: 'weakly tame recycle',
  ratingvalue: 1472,
};

export const sampleWithPartialData: IRating = {
  id: 30301,
  rating: 'suspiciously brightly',
  ratingvalue: 12071,
};

export const sampleWithFullData: IRating = {
  id: 32705,
  rating: 'pfft frightening rundown',
  ratingvalue: 7864,
};

export const sampleWithNewData: NewRating = {
  rating: 'reproachfully ack until',
  ratingvalue: 23485,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
